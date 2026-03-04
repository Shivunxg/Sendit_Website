import { 
  Package, 
  Truck, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Zap, 
  TrendingUp, 
  Globe, 
  Users, 
  Lock,
  Menu,
  X,
  ChevronRight,
  Warehouse,
  Boxes,
  Activity,
  DollarSign,
  MapPin,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import Lottie from 'lottie-react';

// --- Components ---

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    // Fetch Lottie animation data - using a more reliable logistics/network animation
    // Using a stable URL and adding content-type verification
    fetch('https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json')
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          return res.json();
        }
        throw new Error("Invalid response or not JSON");
      })
      .then(data => {
        if (data && typeof data === 'object') {
          setLottieData(data);
        }
      })
      .catch(err => console.warn("Lottie loading skipped:", err));

    const generateHeroImage = async () => {
      setIsGenerating(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
        const prompt = `A professional, high-tech logistics and fulfillment dashboard for a modern Indian enterprise. The UI is clean and sophisticated, showing:
- A map of India with glowing delivery routes and fulfillment center nodes.
- Real-time shipping analytics (order volume, delivery performance, inventory levels).
- Integration icons for major Indian marketplaces and couriers (represented as clean, abstract symbols).
- A "Unified Infrastructure" feel with connected data points.

Style:
- Modern SaaS aesthetic (similar to Stripe or Flexport)
- Professional photography of a high-end tablet or monitor displaying the dashboard
- Soft, natural lighting
- High resolution, cinematic feel
- No people
- No readable text
- No logos

Mood:
- Scalable, reliable, intelligent, unified control.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: prompt,
        });

        if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error generating hero image:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateHeroImage();
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Lottie/Visual Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        {lottieData && (
          <Lottie 
            animationData={lottieData} 
            loop={true} 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Column (55%) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-[55%] text-left"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider mb-8 border border-slate-200">
              NEW: Multi-Warehouse Sync Available
            </span>
            <h1 className="text-5xl md:text-[64px] font-display font-bold tracking-tight text-brand-dark mb-6 leading-[1.1]">
              India’s Unified <br />
              <span className="font-extrabold text-emerald-600">Shipping & Fulfillment Infrastructure</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary mb-10 leading-relaxed max-w-xl">
              Sendit connects courier aggregation, inventory intelligence, and warehouse execution into one structured logistics operating system built for Indian businesses at scale.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <button 
                onClick={onContactClick}
                className="w-full sm:w-auto px-8 py-4 bg-brand-dark text-white rounded-lg font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
              >
                Start Shipping <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-600/20"
              >
                Book a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" /> 15+ Courier Integrations
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" /> Multi-Warehouse Sync
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" /> Real-Time Shipping Analytics
              </div>
            </div>
          </motion.div>

          {/* Product UI Mockup (45%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[45%] relative"
          >
            <div className="relative rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100 relative">
                <motion.img 
                  key={heroImage}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  src={heroImage} 
                  alt="Sendit Enterprise Dashboard" 
                  className="w-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Lottie for "Seamless Integration" feel */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {lottieData && (
                    <div className="w-64 h-64 opacity-20">
                      <Lottie 
                        animationData={lottieData} 
                        loop={true} 
                      />
                    </div>
                  )}
                </div>

                {isGenerating && (
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold border border-white/10 z-10">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    AI Refining...
                  </div>
                )}
              </div>
              
              {/* Floating Stats - Realistic Data */}
              <div className="absolute top-6 -left-6 hidden xl:block">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-4 rounded-xl border border-slate-200/50 shadow-xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Activity className="text-brand-accent w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Orders Today</p>
                    <p className="text-lg font-bold text-brand-dark">2,847</p>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-12 -right-6 hidden xl:block">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="glass-card p-4 rounded-xl border border-slate-200/50 shadow-xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Truck className="text-brand-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">On-Time Delivery</p>
                    <p className="text-lg font-bold text-brand-dark">96.4%</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  return (
    <section className="py-12 border-y border-slate-100 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Trusted by growing brands and 3PL operators across India
        </p>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale">
          {/* Placeholder Logos */}
          <div className="text-2xl font-bold tracking-tighter">BRANDONE</div>
          <div className="text-2xl font-bold tracking-tighter">LOGICORP</div>
          <div className="text-2xl font-bold tracking-tighter">SWIFTMOVE</div>
          <div className="text-2xl font-bold tracking-tighter">D2CHUB</div>
          <div className="text-2xl font-bold tracking-tighter">MARKETFLOW</div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">Ready to Simplify Shipping & Fulfillment?</h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Stop juggling multiple tools. Start operating from a single logistics command center.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onContactClick}
            className="w-full sm:w-auto px-10 py-5 bg-white text-brand-dark rounded-lg font-bold text-xl hover:bg-slate-50 transition-all shadow-xl"
          >
            Start Shipping
          </button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-lg font-bold text-xl hover:opacity-90 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group"
          >
            Book a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Home = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <>
      <Hero onContactClick={onContactClick} />
      <TrustStrip />

      {/* Storefront Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-12">Seamless Storefront Integrations</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Connect your favorite e-commerce platforms and marketplaces with ease.</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-600">Shopify</div>
            <div className="text-3xl font-bold text-blue-600">WooCommerce</div>
            <div className="text-3xl font-bold text-red-600">Magento</div>
            <div className="text-3xl font-bold text-purple-600">Amazon</div>
            <div className="text-3xl font-bold text-green-600">Flipkart</div>
          </div>
        </div>
      </section>

      {/* ERP Integrations */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-12">Powerful ERP & Accounting Integrations</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Sync your operations with leading enterprise resource planning and accounting systems.</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-800">SAP</div>
            <div className="text-3xl font-bold text-green-700">Oracle</div>
            <div className="text-3xl font-bold text-indigo-700">Microsoft Dynamics</div>
            <div className="text-3xl font-bold text-yellow-600">Tally</div>
            <div className="text-3xl font-bold text-red-700">Zoho</div>
          </div>
        </div>
      </section>

      <FinalCTA onContactClick={onContactClick} />
    </>
  );
}

export default Home;
