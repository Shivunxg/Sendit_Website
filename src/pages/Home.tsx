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
import { Helmet } from 'react-helmet-async';
import Lottie from 'lottie-react';

import OrderLifecycle from '../components/OrderLifecycle';

// --- Components ---

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
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
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden premium-hero">
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
              <div className="relative group w-full sm:w-auto">
                <motion.div
                  className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-emerald-500/50 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <button 
                  onClick={onContactClick}
                  className="relative w-full sm:w-auto px-8 py-4 bg-brand-dark text-white rounded-lg font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Shipping <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
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
            <OrderLifecycle />
            
            {/* Floating Stats - Realistic Data */}
            <div className="absolute -top-10 -right-10 hidden xl:block z-20">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-4 rounded-xl border border-slate-200/50 shadow-2xl flex items-center gap-4 bg-white/80 backdrop-blur-md"
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

              <div className="absolute -bottom-10 -left-10 hidden xl:block z-20">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="glass-card p-4 rounded-xl border border-slate-200/50 shadow-2xl flex items-center gap-4 bg-white/80 backdrop-blur-md"
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
            </motion.div>
          </div>
        </div>
      </section>
  );
};

const TrustStrip = () => {
  const brands = [
    "GoSwasthya", "BAMUL", "Arabian Pulp", "Sharepal", "Farmkin",
    "Flipkart", "Amazon", "Zippie", "Purplle", "Velocity"
  ];

  return (
    <section className="py-12 border-y border-slate-100 bg-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Brands we work with
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-20 px-8">
          {brands.concat(brands).map((brand, idx) => (
            <div 
              key={idx} 
              className="text-3xl font-bold tracking-tighter opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 shrink-0 cursor-default"
            >
              {brand}
            </div>
          ))}
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
          <div className="relative group w-full sm:w-auto">
            <motion.div
              className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-emerald-500/50 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            />
            <button 
              onClick={onContactClick}
              className="relative w-full sm:w-auto px-10 py-5 bg-white text-brand-dark rounded-lg font-bold text-xl hover:bg-slate-50 transition-all shadow-xl"
            >
              Start Shipping
            </button>
          </div>
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
      <Helmet>
        <title>Sendit | India’s Unified Shipping & Fulfillment Infrastructure</title>
        <meta name="description" content="Sendit connects courier aggregation, inventory intelligence, and warehouse execution into one structured logistics operating system built for Indian businesses at scale." />
        <link rel="canonical" href="https://sendit.in/" />
      </Helmet>
      <Hero onContactClick={onContactClick} />
      <TrustStrip />


      {/* Shipping Partners */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Our Logistics Network</h3>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 px-8">
            {[
              { name: "Blue Dart", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Blue_Dart_logo.svg/512px-Blue_Dart_logo.svg.png" },
              { name: "Delhivery", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Delhivery_Logo.svg/512px-Delhivery_Logo.svg.png" },
              { name: "Ecom Express", logo: "https://logo.clearbit.com/ecomexpress.in" },
              { name: "XpressBees", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Xpressbees_logo.png/512px-Xpressbees_logo.png" },
              { name: "Shadowfax", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Shadowfax_logo.png/512px-Shadowfax_logo.png" },
              { name: "DTDC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/DTDC_Logo.png/512px-DTDC_Logo.png" }
            ].concat([
              { name: "Blue Dart", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Blue_Dart_logo.svg/512px-Blue_Dart_logo.svg.png" },
              { name: "Delhivery", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Delhivery_Logo.svg/512px-Delhivery_Logo.svg.png" },
              { name: "Ecom Express", logo: "https://logo.clearbit.com/ecomexpress.in" },
              { name: "XpressBees", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Xpressbees_logo.png/512px-Xpressbees_logo.png" },
              { name: "Shadowfax", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Shadowfax_logo.png/512px-Shadowfax_logo.png" },
              { name: "DTDC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/DTDC_Logo.png/512px-DTDC_Logo.png" }
            ]).map((partner, idx) => (
              <div key={idx} className="shrink-0 flex items-center justify-center w-40 h-16 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const textNode = document.createElement('span');
                      textNode.className = 'text-3xl font-bold text-slate-300 group-hover/logo:text-blue-500 transition-colors';
                      textNode.innerText = partner.name;
                      parent.appendChild(textNode);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storefront Integrations */}
      <section className="py-20 bg-bg-base">
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
      <section className="py-20 bg-bg-alt border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-12">Powerful ERP & Accounting Integrations</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Sync your operations with leading enterprise resource planning and accounting systems.</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-800">Odoo</div>
            <div className="text-3xl font-bold text-green-700">QuickBooks</div>
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
