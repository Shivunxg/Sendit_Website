import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Shield, Globe, Zap, Database, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Logo from '../components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dashboardImage, setDashboardImage] = useState<string>("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const generateDashboardImage = async () => {
      setIsGenerating(true);
      try {
        const prompt = `A cinematic, ultra-high-end enterprise logistics control center dashboard. A sleek, thin-bezel professional monitor displays a sophisticated UI with:
- A glowing, detailed map of India with real-time delivery nodes.
- Elegant, translucent data visualizations (bar charts, line graphs, circular gauges).
- Subtle blue, emerald, and indigo accents on a deep charcoal/navy background.
- The lighting is moody and professional, with soft reflections on the screen.
- The environment is a minimal, high-tech command center.
- No people, no readable text, no logos.
- Style: Professional photography, 8k resolution, cinematic depth of field.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setDashboardImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating dashboard image:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateDashboardImage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* Left Side: Brand Visual Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0B1220] to-[#111827] items-center justify-center p-12">
        {/* Logo for Left Panel */}
        <div className="absolute top-10 left-10 z-20">
          <Link to="/">
            <Logo className="h-8 brightness-0 invert opacity-80" />
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Control Your Fulfillment <br />
              <span className="text-blue-400">From One Dashboard</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Warehouse management, courier orchestration, and real-time profitability — unified.
            </p>
          </motion.div>

          {/* Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm overflow-hidden aspect-square"
          >
            <img 
              src={dashboardImage} 
              alt="Logistics Dashboard" 
              className={`w-full h-full object-cover rounded-2xl transition-all duration-1000 ${isGenerating ? 'blur-sm opacity-50' : 'blur-none opacity-100'}`}
              referrerPolicy="no-referrer"
            />
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 border border-white/10">
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  <span className="text-white font-medium text-sm">Syncing Control Tower...</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { icon: <Globe className="w-4 h-4" />, label: "15+ Courier Integrations" },
              { icon: <Database className="w-4 h-4" />, label: "Multi-Warehouse Sync" },
              { icon: <Zap className="w-4 h-4" />, label: "99.9% Uptime Infrastructure" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex flex-col gap-2"
              >
                <div className="text-blue-400">{item.icon}</div>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Login Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-12">
            <div className="text-center mb-10">
              <Link to="/" className="inline-block mb-8">
                <Logo className="h-10 mx-auto" />
              </Link>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500">Access your Fulfillment Control Tower.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <button className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/10">
                Access Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
              <Shield className="w-4 h-4" />
              <p className="text-xs font-medium">Your data is protected with enterprise-grade security.</p>
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              Don't have an account? <Link to="/pricing" className="font-bold text-blue-600 hover:text-blue-700">Get Started</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

