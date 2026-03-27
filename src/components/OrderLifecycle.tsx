import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Database, 
  PackageCheck, 
  Truck, 
  MapPin, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Order Received",
    desc: "Synced from Shopify, Amazon, or ERP",
    color: "text-lifecycle-order",
    bg: "bg-lifecycle-order/10"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Inventory Sync",
    desc: "Real-time stock check across nodes",
    color: "text-lifecycle-inventory",
    bg: "bg-lifecycle-inventory/10"
  },
  {
    icon: <PackageCheck className="w-6 h-6" />,
    title: "Warehouse Execution",
    desc: "Smart picking & packing via WareSync",
    color: "text-lifecycle-warehouse",
    bg: "bg-lifecycle-warehouse/10"
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Shipping Orchestration",
    desc: "AI courier selection via SwiftShip",
    color: "text-lifecycle-shipping",
    bg: "bg-lifecycle-shipping/10"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Last-Mile Delivery",
    desc: "Real-time tracking & NDR resolution",
    color: "text-lifecycle-delivery",
    bg: "bg-lifecycle-delivery/10"
  }
];

const OrderLifecycle = () => {
  return (
    <div className="w-full py-10 px-8 bg-white rounded-[2.5rem] border border-brand-secondary/10 shadow-2xl overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -ml-16 -mb-16" />

      <div className="flex flex-col gap-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-display font-bold text-brand-dark mb-1">Unified Order Lifecycle</h3>
            <p className="text-xs text-brand-accent font-medium">End-to-end fulfillment orchestration</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-wider border border-brand-accent/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Fully Automated
          </div>
        </div>

        <div className="relative py-4">
          {/* Animated Connection Line */}
          <div className="absolute top-[32px] left-0 w-full h-[2px] bg-brand-secondary/10 hidden lg:block">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-lifecycle-order via-lifecycle-warehouse to-lifecycle-delivery relative"
            >
              <motion.div 
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-20 bg-white/50 blur-sm"
              />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-5 shadow-sm relative z-20 border border-white transition-all duration-300 group-hover:shadow-lg`}
                >
                  {step.icon}
                  {/* Pulse effect for active-like feel */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className={`absolute inset-0 rounded-2xl ${step.bg} -z-10`}
                  />
                </motion.div>
                <h4 className="font-bold text-brand-dark mb-2 text-sm tracking-tight">{step.title}</h4>
                <p className="text-[11px] text-brand-secondary leading-relaxed max-w-[140px] font-medium">
                  {step.desc}
                </p>
                
                {i < steps.length - 1 && (
                  <div className="mt-6 lg:hidden flex justify-center w-full">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 text-brand-secondary/20 rotate-90" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-5 bg-brand-secondary/5 rounded-2xl border border-brand-secondary/10 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, zIndex: 30 }}
                    className="w-9 h-9 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center text-[10px] font-bold text-brand-accent relative cursor-default"
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-brand-secondary font-medium">
                <span className="font-bold text-brand-dark">2,400+ orders</span> processed in the last hour.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              LIVE SYSTEM STATUS
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderLifecycle;
