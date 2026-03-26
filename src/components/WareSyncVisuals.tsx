import React from 'react';
import { motion } from 'motion/react';
import { 
  Warehouse, 
  Boxes, 
  Truck, 
  ShoppingCart, 
  Globe, 
  Smartphone, 
  Database, 
  Activity, 
  Zap, 
  CheckCircle2, 
  MapPin, 
  Navigation,
  BarChart3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const WMSVisual = () => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden border border-slate-200 shadow-inner">
      {/* Handheld Scanner Mockup */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4 flex flex-col gap-3 relative z-10"
      >
        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scanner Active</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Current Task</p>
            <p className="text-xs font-bold text-slate-900">Putaway: Bin A-12-04</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="h-1.5 w-20 bg-slate-100 rounded-full mb-1" />
              <div className="h-1 w-12 bg-slate-50 rounded-full" />
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </motion.div>

      {/* Warehouse Grid Mockup */}
      <div className="grid grid-cols-4 gap-2 flex-grow">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-lg border border-slate-100 flex items-center justify-center ${i % 3 === 0 ? 'bg-emerald-50/50' : 'bg-white'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-emerald-400' : 'bg-slate-100'}`} />
          </motion.div>
        ))}
      </div>

      {/* Floating Efficiency Badge */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-12 right-4 p-3 bg-white rounded-xl shadow-xl border border-slate-100 flex items-center gap-2 z-20"
      >
        <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center">
          <Zap className="w-3 h-3 text-emerald-600" />
        </div>
        <div>
          <p className="text-[8px] font-bold text-slate-400 uppercase">Efficiency</p>
          <p className="text-[10px] font-bold text-emerald-600">+35%</p>
        </div>
      </motion.div>
    </div>
  );
};

export const OMSVisual = () => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden border border-slate-200 shadow-inner">
      {/* Central Hub */}
      <div className="flex items-center justify-center flex-grow relative">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-20 h-20 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-200 flex items-center justify-center relative z-10"
        >
          <ShoppingCart className="w-10 h-10 text-white" />
        </motion.div>

        {/* Channel Nodes */}
        {[
          { icon: <Globe className="w-4 h-4" />, pos: "top-0 left-1/2 -translate-x-1/2" },
          { icon: <Smartphone className="w-4 h-4" />, pos: "bottom-0 left-1/2 -translate-x-1/2" },
          { icon: <ShoppingCart className="w-4 h-4" />, pos: "left-0 top-1/2 -translate-y-1/2" },
          { icon: <Database className="w-4 h-4" />, pos: "right-0 top-1/2 -translate-y-1/2" }
        ].map((node, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`absolute ${node.pos} w-10 h-10 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center`}
          >
            <div className="text-blue-600">{node.icon}</div>
            {/* Connection Line */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-20 h-[1px] bg-blue-100" />
            </div>
          </motion.div>
        ))}

        {/* Pulsing Sync Rings */}
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-20 h-20 border-2 border-blue-400 rounded-3xl"
        />
      </div>

      {/* Sync Status Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventory Sync</span>
          <span className="text-[10px] font-bold text-blue-600">99.9% Success</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "99.9%" }}
            transition={{ duration: 2 }}
            className="h-full bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export const InventoryVisual = () => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden border border-slate-200 shadow-inner">
      {/* Main Chart Area */}
      <div className="flex-grow bg-white rounded-2xl border border-slate-100 p-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock Velocity</p>
            <p className="text-lg font-bold text-slate-900">SKU-9283</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-purple-50 text-purple-600 rounded-lg">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px] font-bold">+12%</span>
          </div>
        </div>

        {/* Animated Bar Chart */}
        <div className="flex items-end gap-1.5 h-32">
          {[40, 70, 45, 90, 65, 80, 55, 75, 60, 85].map((h, i) => (
            <div key={i} className="flex-grow flex flex-col items-center gap-1">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                className={`w-full rounded-t-md border-t-2 ${i === 3 ? 'bg-purple-500 border-purple-600' : 'bg-purple-500/20 border-purple-500/40'}`}
              />
              <div className="w-1 h-1 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="h-full w-full grid grid-cols-10 grid-rows-5">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="border border-slate-900" />
            ))}
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Low Stock</p>
            <p className="text-[10px] font-bold text-slate-900">12 Items</p>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Turnover</p>
            <p className="text-[10px] font-bold text-slate-900">High</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const OmnichannelVisual = () => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden border border-slate-200 shadow-inner">
      {/* Map Mockup */}
      <div className="flex-grow bg-white rounded-2xl border border-slate-100 p-4 shadow-sm relative overflow-hidden">
        {/* Simplified Map Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 400 300">
          <path d="M0 50H400M0 150H400M0 250H400M100 0V300M200 0V300M300 0V300" stroke="currentColor" strokeWidth="2"/>
        </svg>

        {/* Store Nodes */}
        {[
          { x: "20%", y: "30%", color: "bg-orange-500" },
          { x: "70%", y: "20%", color: "bg-blue-500" },
          { x: "50%", y: "70%", color: "bg-emerald-500" }
        ].map((node, i) => (
          <motion.div 
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.3 }}
            style={{ left: node.x, top: node.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className={`w-4 h-4 rounded-full ${node.color} shadow-lg shadow-${node.color.split('-')[1]}-200`} />
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 border-2 border-${node.color.split('-')[1]}-400 rounded-full`}
            />
          </motion.div>
        ))}

        {/* Delivery Route Animation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
          <motion.path 
            d="M80 90 Q 200 150 200 210"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>

        {/* Floating Delivery Status */}
        <motion.div 
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-4 right-4 p-2 bg-white rounded-lg shadow-lg border border-slate-100 flex items-center gap-2"
        >
          <Truck className="w-3 h-3 text-orange-600" />
          <span className="text-[9px] font-bold text-slate-900">Hyperlocal Active</span>
        </motion.div>
      </div>

      {/* Store Stats */}
      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Nearest Store</p>
            <p className="text-[10px] font-bold text-slate-900">Indiranagar, BLR</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-bold text-slate-400 uppercase">Distance</p>
          <p className="text-[10px] font-bold text-emerald-600">1.2 km</p>
        </div>
      </div>
    </div>
  );
};
