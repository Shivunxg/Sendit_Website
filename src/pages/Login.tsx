import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';

const Login = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans selection:bg-brand-primary/10">
      {/* Left Side: Brand Visual Panel (SaaS Style) */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#020617] flex-col justify-between p-12">
        {/* Atmospheric Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-brand-primary/30 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-brand-secondary/20 rounded-full blur-[120px]" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-brand-secondary/40 hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Next-Gen Logistics
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Fulfillment at the <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">speed of thought.</span>
            </h1>
            <p className="text-xl text-brand-secondary/40 leading-relaxed font-medium max-w-md">
              The unified infrastructure for brands that refuse to slow down.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Data Visualization */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 group"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-brand-secondary/40 uppercase tracking-widest">Global Throughput</p>
                <p className="text-2xl font-mono font-bold text-white tracking-tighter">142.8k <span className="text-brand-secondary text-sm">↑ 12%</span></p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-brand-primary" />
              </div>
            </div>

            <div className="h-40 flex items-end gap-2">
              {[60, 40, 80, 50, 90, 70, 100, 85, 65, 95, 75, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-brand-secondary/10 rounded-t-lg relative overflow-hidden h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ 
                      delay: 0.5 + (i * 0.08), 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 2
                    }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-primary to-brand-secondary rounded-t-lg"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/30" />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                  className="w-10 h-10 rounded-full border-2 border-[#020617] ring-2 ring-brand-primary/20" 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">Trusted by 5,000+ brands</p>
              <p className="text-xs text-brand-secondary/40">Join the world's fastest growing logistics network.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Auth Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-brand-secondary/5 relative">
        {/* Mobile Back Button */}
        <Link 
          to="/" 
          className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-brand-secondary/40 hover:text-brand-primary transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Home</span>
        </Link>

        <div className="w-full max-w-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {authMode === 'login' ? (
              <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
            )}
          </motion.div>

          <div className="mt-12 pt-8 border-t border-brand-secondary/10 flex items-center justify-center gap-8">
            <div className="flex items-center gap-1.5 text-brand-secondary/40">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">SOC2 Type II</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-secondary/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">GDPR Compliant</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 space-y-6">
            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-widest text-center">Frequently Asked Questions</h3>
            <div className="grid gap-4">
              {[
                {
                  q: "How do I access WareSync?",
                  a: "WareSync is currently in closed access. After signing up, please contact your account manager for approval."
                },
                {
                  q: "Can I use one account for all products?",
                  a: "Yes! Your Sendit account works across SwiftShip, WareSync, and all our shipping tools."
                },
                {
                  q: "Is my data secure?",
                  a: "We use industry-standard AES-256 encryption and are fully SOC2 Type II and GDPR compliant."
                }
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="bg-white p-4 rounded-xl border border-brand-secondary/10 hover:border-brand-primary/20 transition-colors group"
                >
                  <p className="text-xs font-bold text-brand-dark mb-1 group-hover:text-brand-primary transition-colors">{faq.q}</p>
                  <p className="text-[11px] text-brand-secondary/40 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


