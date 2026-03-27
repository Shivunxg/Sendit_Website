import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase';

interface User {
  userId: string;
  email: string;
}

interface ProductContext {
  productId: string;
  role: string;
}

interface AccessibleProduct {
  productId: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  currentProduct: ProductContext | null;
  accessibleProducts: AccessibleProduct[];
  loading: boolean;
  login: (email: string, password: string, productId: string) => Promise<void>;
  signup: (email: string, password: string, name: string, companyName: string, contactNo: string) => Promise<void>;
  switchProduct: (productId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [currentProduct, setCurrentProduct] = useState<ProductContext | null>(null);
  const [accessibleProducts, setAccessibleProducts] = useState<AccessibleProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        // If we have a firebase user, try to validate the SaaS session
        try {
          const res = await fetch('/api/auth/validate');
          if (res.ok) {
            const data = await res.json();
            setUser({ userId: data.user.userId, email: data.user.email });
            setCurrentProduct({ productId: data.user.productId, role: data.user.role });
          }
        } catch (error) {
          console.error("Token validation failed", error);
        }
      } else {
        setUser(null);
        setCurrentProduct(null);
        setAccessibleProducts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, productId: string) => {
    try {
      // 1. Firebase Login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2. SaaS Login (Backend)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, productId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      setCurrentProduct(data.currentProduct);
      setAccessibleProducts(data.accessibleProducts);
    } catch (error: any) {
      // Map Firebase errors to user-friendly message
      if (
        error.code === 'auth/operation-not-allowed' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-email'
      ) {
        throw new Error('Invalid user ID or password');
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, companyName: string, contactNo: string) => {
    try {
      // 1. Firebase Signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2. SaaS Signup (Backend)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, name, companyName, contactNo }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Signup failed');
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      }
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Signup is currently disabled');
      }
      throw error;
    }
  };

  const switchProduct = async (productId: string) => {
    const res = await fetch('/api/auth/switch-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Switch failed');
    }

    const data = await res.json();
    setCurrentProduct(data.currentProduct);
  };

  const logout = async () => {
    await signOut(auth);
    // Clear cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setCurrentProduct(null);
    setAccessibleProducts([]);
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, currentProduct, accessibleProducts, loading, login, signup, switchProduct, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
