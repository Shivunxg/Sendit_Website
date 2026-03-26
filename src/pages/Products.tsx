import { Warehouse, Truck, CheckCircle2, ArrowRight, ExternalLink, Loader2, Boxes, PackageCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Products = ({ onContactClick }: { onContactClick: () => void }) => {
  const [waresyncImage] = useState<string>("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200");
  const [swiftshipImage] = useState<string>("https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=1200");

  useEffect(() => {
    // Static images are now used, no AI generation needed.
  }, []);
  return (
    <div className="pt-32 pb-24 premium-hero">
      <Helmet>
        <title>Products | Unified Logistics Operating System | Sendit</title>
        <meta name="description" content="Explore Sendit's suite of logistics products: WareSync for warehouse management and SwiftShip for intelligent courier aggregation." />
        <link rel="canonical" href="https://sendit.in/products" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our Products</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sendit combines two powerful products into a unified logistics operating system.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* WareSync */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="standard-card p-8 md:p-12 flex flex-col"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
              <Warehouse className="text-emerald-600 w-8 h-8" />
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video bg-white border border-slate-200 shadow-inner p-6 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 w-full">
                {[
                  { icon: <Warehouse className="w-6 h-6" />, label: "Inbound" },
                  { icon: <Boxes className="w-6 h-6" />, label: "Inventory" },
                  { icon: <PackageCheck className="w-6 h-6" />, label: "Outbound" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{step.label}</span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            </div>

            <h3 className="text-4xl font-display font-bold mb-2">WareSync</h3>
            <p className="text-emerald-600 font-semibold mb-6">Inventory & Warehouse Management System</p>
            <p className="text-slate-600 mb-8 text-lg">Gain real-time control over stock, storage, and fulfillment workflows.</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Live multi-warehouse inventory visibility",
                "SKU-level analytics & stock aging reports",
                "GRN, putaway & smart bin allocation",
                "Barcode-enabled picking & packing",
                "UniReco Payment Reconciliation",
                "Omnichannel 'Ship from Store' enablement"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 group"
              >
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <Link 
                to="/products/waresync"
                className="flex-grow py-4 bg-white text-black border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Learn More <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* SwiftShip */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="standard-card p-8 md:p-12 flex flex-col"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
              <Truck className="text-blue-600 w-8 h-8" />
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video bg-slate-200 border border-slate-200 shadow-inner">
              <motion.img 
                key={swiftshipImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={swiftshipImage} 
                alt="SwiftShip Operations" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <h3 className="text-4xl font-display font-bold mb-2">SwiftShip</h3>
            <p className="text-blue-600 font-semibold mb-6">Intelligent Courier Aggregation Engine</p>
            <p className="text-slate-600 mb-8 text-lg">Ship smarter with automated courier orchestration built for India’s logistics complexity.</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "15+ courier integrations",
                "AI-powered RTO Reduction Suite",
                "Smart auto-allocation & NDR automation",
                "Branded tracking & status alerts",
                "Early COD Remittance (D+2 Days)",
                "Returns & Exchange automation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 group"
              >
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <Link 
                to="/products/swiftship"
                className="flex-grow py-4 bg-white text-black border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Learn More <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;
