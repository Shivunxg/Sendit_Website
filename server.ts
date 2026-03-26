import express from "express";
import path from "node:path";
import fs from "node:fs";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Load Firebase Config manually to avoid ESM JSON issues
const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = getFirestore();
const auth = getAuth();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // API Route: Generate SSO JWT
  app.post("/api/auth/sso", async (req, res) => {
    const { idToken, productId } = req.body;

    if (!idToken || !productId) {
      return res.status(400).json({ error: "Missing idToken or productId" });
    }

    try {
      // 1. Verify Firebase ID Token
      const decodedToken = await auth.verifyIdToken(idToken);
      const userId = decodedToken.uid;
      const email = decodedToken.email;

      // 2. Fetch User Data from Firestore
      const userDoc = await db.collection("users").doc(userId).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      const userData = userDoc.data();
      const product = userData?.products?.find((p: any) => p.productId === productId && p.access === true);

      if (!product) {
        return res.status(403).json({ error: "Access denied to this product" });
      }

      // 3. Return redirect URL (JWT removed for now)
      const redirectUrl = `${product.url}?userId=${userId}`;
      res.json({ redirectUrl });
    } catch (error) {
      console.error("SSO Error:", error);
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
