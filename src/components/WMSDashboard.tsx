import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'motion/react';
import { 
  Warehouse, 
  Boxes, 
  ShoppingCart, 
  BarChart3, 
  Search, 
  Bell,
  User,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const AnimatedNumber = ({ value, duration = 2, isPercentage = false }: { value: number, duration?: number, isPercentage?: boolean }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (isPercentage) {
      return latest.toFixed(1) + '%';
    }
    return Math.round(latest).toLocaleString();
  });
  const [displayValue, setDisplayValue] = useState(isPercentage ? "0.0%" : "0");

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return () => controls.stop();
  }, [count, value, duration]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  return <>{displayValue}</>;
};

const WMSDashboard = () => {
  return (
    <div className="w-full aspect-square bg-brand-dark rounded-[2.5rem] p-6 border border-white/10 overflow-hidden relative group">
      {/* Sidebar Mockup */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-brand-dark/50 border-r border-white/5 flex flex-col items-center py-8 gap-6">
        <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center mb-4">
          <Warehouse className="w-5 h-5 text-white" />
        </div>
        {[Boxes, ShoppingCart, BarChart3, Search].map((Icon, i) => (
          <div key={i} className={`p-2 rounded-lg ${i === 0 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}>
            <Icon className="w-5 h-5" />
          </div>
        ))}
      </div>

      {/* Main Content Mockup */}
      <div className="ml-16 h-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-white/40" />
            </div>
            <div className="h-2 w-24 bg-brand-dark rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-white/40" />
            <MoreVertical className="w-4 h-4 text-white/40" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-white/5 rounded-2xl border border-white/5"
          >
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Active Bins</p>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-white">
                <AnimatedNumber value={1284} />
              </p>
              <span className="text-[10px] text-brand-accent font-bold flex items-center mb-1">
                <ArrowUpRight className="w-3 h-3" /> 12%
              </span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-white/5 rounded-2xl border border-white/5"
          >
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Pick Rate</p>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-white">
                <AnimatedNumber value={98.2} isPercentage />
              </p>
              <span className="text-[10px] text-brand-accent font-bold flex items-center mb-1">
                <ArrowUpRight className="w-3 h-3" /> 4%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Inventory List Mockup */}
        <div className="flex-grow bg-white/5 rounded-2xl border border-white/5 p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-white">Recent Inventory Movements</p>
            <div className="px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent text-[8px] font-bold uppercase">Live</div>
          </div>
          
          <div className="space-y-3">
            {[
              { id: "SKU-8271", status: "Picked", time: "2m ago", color: "text-brand-primary" },
              { id: "SKU-1923", status: "Packed", time: "5m ago", color: "text-brand-accent" },
              { id: "SKU-4412", status: "Inbound", time: "12m ago", color: "text-brand-accent" },
              { id: "SKU-9901", status: "QC Pass", time: "15m ago", color: "text-brand-secondary" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color.replace('text', 'bg')}`} />
                  <p className="text-[10px] font-mono text-white/60">{item.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`text-[10px] font-bold ${item.color}`}>{item.status}</p>
                  <div className="flex items-center gap-1 text-white/40">
                    <Clock className="w-3 h-3" />
                    <span className="text-[8px]">{item.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Action Overlay */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 p-4 bg-brand-accent rounded-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
          <div className="text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Stock Sync</p>
            <p className="text-sm font-bold">Successful</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
    </div>
  );
};

export default WMSDashboard;
