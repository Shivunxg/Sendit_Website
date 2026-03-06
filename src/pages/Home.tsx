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
  ChevronRight,
  Warehouse,
  Boxes,
  DollarSign,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Components ---

const lifecycleSteps = [
  {
    title: 'Order Received',
    description: 'Orders sync instantly from Shopify, marketplaces, and ERP channels.',
    icon: Package,
  },
  {
    title: 'Inventory Allocation',
    description: 'Sendit selects the best warehouse and reserves stock in real time.',
    icon: Warehouse,
  },
  {
    title: 'Picking & Packing',
    description: 'Picklists and packing SLAs are automated for warehouse operators.',
    icon: Boxes,
  },
  {
    title: 'Courier Dispatch',
    description: 'Shipment is assigned to the best courier based on zone, SLA, and cost.',
    icon: Truck,
  },
  {
    title: 'Out for Delivery',
    description: 'Live tracking and proactive alerts are shared with your customers.',
    icon: MapPin,
  },
  {
    title: 'Delivered & Reconciled',
    description: 'POD, delivery status, and reconciliation close the fulfillment lifecycle.',
    icon: ShieldCheck,
  },
];

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
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
              From ordering to final delivery, Sendit orchestrates each stage in one connected lifecycle so your team can ship faster with full operational control.
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

          {/* Lifecycle Model (45%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[45%]"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">How Sendit Works</h2>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Ordering → Delivery</span>
              </div>

              <div className="space-y-3">
                {lifecycleSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative">
                      <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{step.title}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                      {index < lifecycleSteps.length - 1 && (
                        <div className="flex justify-center py-1">
                          <ChevronRight className="w-4 h-4 text-slate-300 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                  <BarChart3 className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">SLA Control</p>
                  <p className="text-sm font-bold text-slate-900">99.2%</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                  <Zap className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">Faster Dispatch</p>
                  <p className="text-sm font-bold text-slate-900">2.4x</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                  <DollarSign className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">Cost Efficiency</p>
                  <p className="text-sm font-bold text-slate-900">18%</p>
                </div>
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
          Brands we work with
        </p>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale">
          <div className="text-2xl font-bold tracking-tighter">GOswasthya</div>
          <div className="text-2xl font-bold tracking-tighter">BAMUL</div>
          <div className="text-2xl font-bold tracking-tighter">Arabian Pulp</div>
          <div className="text-2xl font-bold tracking-tighter">Sharepal</div>
          <div className="text-2xl font-bold tracking-tighter">Purple</div>
          <div className="text-2xl font-bold tracking-tighter">Farmkin</div>
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
};

export default Home;
