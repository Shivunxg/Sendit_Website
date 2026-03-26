import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, X, CheckCircle2, Globe, Zap, ShieldCheck, BarChart3, Boxes } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Solutions = ({ onContactClick }: { onContactClick: () => void }) => {
  const [sectorImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
  ]);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);

  useEffect(() => {
    // Static images are now used, no AI generation needed.
  }, []);

  const sectors = [
    { 
      title: "D2C Brands", 
      desc: "Scale faster with unified fulfillment and shipping optimization. Sync your Shopify, Magento, or custom store in minutes.",
      features: ["Inventory Sync", "Branded Tracking", "Returns Management"]
    },
    { 
      title: "Marketplace Sellers", 
      desc: "Sync inventory across Amazon, Flipkart, and Myntra. Ship smarter without juggling multiple seller panels.",
      features: ["Multi-channel Sync", "Bulk Label Printing", "Marketplace Reconciliation"]
    },
    { 
      title: "3PL Providers", 
      desc: "Offer warehousing + shipping from a single system. Manage multiple clients with isolated data and custom billing.",
      features: ["Client Dashboards", "Isolated Inventory", "Automated Billing"]
    },
    { 
      title: "Quick Commerce", 
      desc: "Run high-velocity inventory and last-mile coordination. Built for sub-30 minute fulfillment cycles.",
      features: ["Hyperlocal Routing", "Real-time Stock", "Dark Store Management"]
    },
    { 
      title: "B2B Distribution", 
      desc: "Track bulk inventory and optimize delivery economics. Manage large shipments and LTL logistics efficiently.",
      features: ["Bulk Order Processing", "LTL Optimization", "Credit Management"]
    }
  ];

  return (
    <div className="pt-32 pb-24 premium-hero">
      <Helmet>
        <title>Logistics Solutions | Tailored Systems for D2C, Marketplaces & 3PL</title>
        <meta name="description" content="Explore tailored logistics solutions for D2C brands, marketplace sellers, 3PL providers, and quick commerce. Scale your operations with Sendit." />
        <link rel="canonical" href="https://sendit.in/solutions" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Logistics Solutions</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tailored logistics operating systems for every type of modern commerce.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sectors.map((sector, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 standard-card hover:border-emerald-500 transition-all group overflow-hidden cursor-pointer"
              onClick={() => setSelectedSector(i)}
            >
              <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video bg-slate-200 border border-slate-200 shadow-inner">
                <motion.img 
                  key={sectorImages[i]}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  src={sectorImages[i]} 
                  alt={sector.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-emerald-600 transition-colors">{sector.title}</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">{sector.desc}</p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {sector.features.map((f, j) => (
                  <span key={j} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700">
                    {f}
                  </span>
                ))}
              </div>

              <button 
                className="flex items-center gap-2 font-bold text-black hover:gap-3 transition-all"
              >
                Explore Feature <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sector Elaboration Modal */}
        <AnimatePresence>
          {selectedSector !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSector(null)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{sectors[selectedSector].title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedSector(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-grow overflow-y-auto p-8 md:p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h4 className="text-3xl font-display font-bold mb-6">Tailored for {sectors[selectedSector].title}</h4>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {sectors[selectedSector].desc} We provide specialized tools to handle the unique challenges of your industry, ensuring maximum efficiency and scalability.
                      </p>
                      <div className="space-y-6">
                        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <h5 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5" /> Key Capabilities
                          </h5>
                          <ul className="space-y-3">
                            {sectors[selectedSector].features.map((f, idx) => (
                              <li key={idx} className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500 w-4 h-4 shrink-0" />
                                <span className="text-emerald-800 text-sm font-medium">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" /> Expected Impact
                          </h5>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {selectedSector === 0 && "Reduce RTO by 25% and improve customer NPS with branded tracking and seamless returns."}
                            {selectedSector === 1 && "Centralize marketplace operations and eliminate overselling with real-time inventory sync."}
                            {selectedSector === 2 && "Scale client operations with multi-tenant warehousing and automated billing systems."}
                            {selectedSector === 3 && "Achieve sub-30 minute fulfillment with hyperlocal routing and dark store management."}
                            {selectedSector === 4 && "Optimize bulk distribution with LTL logistics tracking and credit management tools."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-square">
                      <img 
                        src={sectorImages[selectedSector]} 
                        alt={sectors[selectedSector].title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Globe className="w-5 h-5" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Powering {sectors[selectedSector].title} globally.</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSector(null);
                      onContactClick();
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 group"
                  >
                    Get Industry Solution <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24 bg-black rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-display font-bold mb-6">Don't see your industry?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Our platform is highly configurable. Talk to our solutions team to see how Sendit can fit your unique operational needs.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            className="px-12 py-5 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group"
          >
            Talk to Solutions Team <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
