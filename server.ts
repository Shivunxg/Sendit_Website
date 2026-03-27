import express from "express";
import path from "node:path";
import fs from "node:fs";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Load Firebase Config manually to avoid ESM JSON issues
const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));

// Initialize Firebase Admin
const adminApp = !getApps().length 
  ? initializeApp({ projectId: firebaseConfig.projectId })
  : getApps()[0];

const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId || undefined);
const auth = getAuth(adminApp);

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-saas-key";

// Product IDs
const PRODUCTS = {
  WARESYNC: "waresync",
  SWIFTSHIP: "swiftship"
};

// Initialize Products in Firestore
async function initializeProducts() {
  const productsRef = db.collection("products");
  const waresyncDoc = await productsRef.doc(PRODUCTS.WARESYNC).get();
  if (!waresyncDoc.exists) {
    await productsRef.doc(PRODUCTS.WARESYNC).set({ name: "WareSync" });
  }
  const swiftshipDoc = await productsRef.doc(PRODUCTS.SWIFTSHIP).get();
  if (!swiftshipDoc.exists) {
    await productsRef.doc(PRODUCTS.SWIFTSHIP).set({ name: "SwiftShip" });
  }
}

initializeProducts().catch(console.error);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the first proxy (nginx in Cloud Run)
  app.set('trust proxy', 1);

  // Global Rate Limiter for API routes
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    // Removed custom keyGenerator to fix ERR_ERL_KEY_GEN_IPV6. 
    // Default uses req.ip which is safe with 'trust proxy' set.
    message: { error: "Too many requests, please try again later." }
  });

  app.use(express.json());
  app.use(cookieParser());

  // Apply rate limiter to all API routes
  app.use("/api/", apiLimiter);

  // Middleware: Authenticate JWT
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  };

  // API Route: Signup (SwiftShip only)
  app.post("/api/auth/signup", async (req, res) => {
    const { idToken, name, companyName, contactNo } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "Firebase ID token required" });
    }

    try {
      // 1. Verify Firebase ID Token
      const decodedToken = await auth.verifyIdToken(idToken);
      const { uid, email } = decodedToken;

      // 2. Check if user metadata exists in Firestore
      const userDoc = await db.collection("users").doc(uid).get();
      if (!userDoc.exists) {
        // Create user metadata
        await db.collection("users").doc(uid).set({
          email,
          name: name || "",
          companyName: companyName || "",
          contactNo: contactNo || "",
          status: "active",
          role: "user",
          createdAt: new Date().toISOString()
        });

        // 3. Map to SwiftShip automatically
        await db.collection("userProductMaps").add({
          userId: uid,
          productId: PRODUCTS.SWIFTSHIP,
          role: "user",
          status: "approved"
        });
      }

      res.status(201).json({ message: "User signed up and mapped to SwiftShip" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(401).json({ error: "Invalid Firebase token" });
    }
  });

  // API Route: Login
  app.post("/api/auth/login", async (req, res) => {
    const { idToken, productId } = req.body;

    if (!idToken || !productId) {
      return res.status(400).json({ error: "Firebase ID token and productId required" });
    }

    try {
      // 1. Verify Firebase ID Token
      const decodedToken = await auth.verifyIdToken(idToken);
      const { uid, email } = decodedToken;

      // 2. Check Product Access
      const mapSnapshot = await db.collection("userProductMaps")
        .where("userId", "==", uid)
        .where("productId", "==", productId)
        .get();

      if (mapSnapshot.empty) {
        return res.status(403).json({ error: "No access to this product" });
      }

      const mapData = mapSnapshot.docs[0].data();

      // WareSync specific check
      if (productId === PRODUCTS.WARESYNC && mapData.status !== "approved") {
        return res.status(403).json({ error: "WareSync access pending approval" });
      }

      // 3. Generate SaaS JWT
      const token = jwt.sign(
        { userId: uid, email, productId, role: mapData.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      // 4. Get all accessible products for the user
      const allMaps = await db.collection("userProductMaps").where("userId", "==", uid).get();
      const accessibleProducts = allMaps.docs.map(doc => ({
        productId: doc.data().productId,
        role: doc.data().role,
        status: doc.data().status
      }));

      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.json({
        token,
        user: { userId: uid, email },
        currentProduct: { productId, role: mapData.role },
        accessibleProducts
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(401).json({ error: "Invalid Firebase token" });
    }
  });

  // API Route: Switch Product
  app.post("/api/auth/switch-product", authenticateToken, async (req: any, res) => {
    const { productId } = req.body;
    const { userId, email } = req.user;

    if (!productId) {
      return res.status(400).json({ error: "productId required" });
    }

    try {
      // Check if user has access to the new product
      const mapSnapshot = await db.collection("userProductMaps")
        .where("userId", "==", userId)
        .where("productId", "==", productId)
        .get();

      if (mapSnapshot.empty) {
        return res.status(403).json({ error: "No access to this product" });
      }

      const mapData = mapSnapshot.docs[0].data();

      if (productId === PRODUCTS.WARESYNC && mapData.status !== "approved") {
        return res.status(403).json({ error: "WareSync access pending approval" });
      }

      // Generate new JWT with updated product context
      const token = jwt.sign(
        { userId, email, productId, role: mapData.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.json({
        token,
        currentProduct: { productId, role: mapData.role }
      });
    } catch (error) {
      console.error("Switch Product Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // API Route: Validate Access (Middleware check)
  app.get("/api/auth/validate", authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  // API Route: Admin - Approve User for WareSync
  app.post("/api/admin/approve-waresync", authenticateToken, async (req: any, res) => {
    // In a real app, we'd check if req.user.role === 'admin'
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ error: "targetUserId required" });
    }

    try {
      const mapSnapshot = await db.collection("userProductMaps")
        .where("userId", "==", targetUserId)
        .where("productId", "==", PRODUCTS.WARESYNC)
        .get();

      if (mapSnapshot.empty) {
        // Create mapping if not exists
        await db.collection("userProductMaps").add({
          userId: targetUserId,
          productId: PRODUCTS.WARESYNC,
          role: "user",
          status: "approved"
        });
      } else {
        // Update existing mapping
        const mapId = mapSnapshot.docs[0].id;
        await db.collection("userProductMaps").doc(mapId).update({ status: "approved" });
      }

      res.json({ message: "User approved for WareSync" });
    } catch (error) {
      console.error("Admin Approval Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
