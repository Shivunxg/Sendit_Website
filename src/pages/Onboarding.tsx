import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import Logo from '../components/Logo';

const Onboarding = () => {
  const { user, userData, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.products && userData.products.length > 0) {
      navigate('/select-product');
    }
  }, [userData, navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    setError(null);

    try {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        // Create initial user data with some default products for demo purposes
        await setDoc(userDocRef, {
          userId: user.uid,
          email: user.email,
          products: [
            {
              productId: 'waresync',
              name: 'WareSync (WMS)',
              url: 'https://waresync.example.com/sso',
              access: true
            },
            {
              productId: 'swiftship',
              name: 'SwiftShip',
              url: 'https://swiftship.example.com/sso',
              access: true
            }
          ],
          defaultProduct: 'waresync'
        });
        navigate('/select-product');
      }
    } catch (err: any) {
      console.error("Onboarding error:", err);
      setError(err.message || "Failed to complete onboarding");
      setLoading(false);
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
        <div className="w-full max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-3xl mb-8"
          >
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </motion.div>
          
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Welcome to Sendit</h1>
          <p className="text-slate-500 text-lg mb-12">
            Your account is ready. Let's set up your product access and get you started.
          </p>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50 text-left mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Setup Checklist</h3>
            <ul className="space-y-4">
              {[
                "Verify your email address",
                "Configure your organization profile",
                "Select your primary logistics tools",
                "Connect your first warehouse"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleCompleteOnboarding}
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/10 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Complete Setup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
