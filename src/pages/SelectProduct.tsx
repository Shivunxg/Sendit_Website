import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, LayoutGrid, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getSSORedirectUrl } from '../services/authService';
import Logo from '../components/Logo';

const SelectProduct = () => {
  const { user, userData, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleSelectProduct = async (productId: string) => {
    setLoading(productId);
    setError(null);

    try {
      // 1. Save as default product in Firestore
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { defaultProduct: productId });
      }

      // 2. Get SSO redirect URL
      const redirectUrl = await getSSORedirectUrl(productId);
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("Selection error:", err);
      setError(err.message || "Failed to redirect to product");
      setLoading(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const products = userData?.products || [];
  const activeProducts = products.filter(p => p.access);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between">
        <Logo className="h-8" />
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6"
            >
              <LayoutGrid className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Select a Product</h1>
            <p className="text-slate-500 text-lg">Choose which platform you want to access today.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-center rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProducts.map((product, idx) => (
              <motion.button
                key={product.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelectProduct(product.productId)}
                disabled={!!loading}
                className="group relative bg-white border border-slate-200 p-8 rounded-3xl text-left hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all disabled:opacity-50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <span className="text-xl font-bold text-slate-400 group-hover:text-blue-600">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  {loading === product.productId && (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-6">Access your {product.name} dashboard and data.</p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                  Launch Product <ArrowRight className="w-4 h-4" />
                </div>
                
                {userData?.defaultProduct === product.productId && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">
                    Default
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {activeProducts.length === 0 && (
            <div className="text-center p-12 bg-white border border-slate-200 rounded-3xl">
              <p className="text-slate-500 mb-6">You don't have access to any products yet.</p>
              <button 
                onClick={() => navigate('/onboarding')}
                className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                Complete Onboarding
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SelectProduct;
