import React from 'react';
import { motion } from 'motion/react';
import { 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Navigation,
  ShieldCheck,
  Zap,
  PhoneCall
} from 'lucide-react';

const SwiftShipVisual = () => {
  return (
    <div className="w-full h-full bg-white rounded-[2rem] p-6 flex flex-col gap-6 relative overflow-hidden shadow-inner">
      {/* Map Background Mockup */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100H800M0 200H800M0 300H800M0 400H800M0 500H800M100 0V600M200 0V600M300 0V600M400 0V600M500 0V600M600 0V600M700 0V600" stroke="currentColor" strokeWidth="2"/>
          <path d="M50 50L150 150L250 100L350 200L450 150L550 250L650 200L750 300" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10"/>
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-brand-dark tracking-tight">Tracking ID: SS-928371</h4>
            <p className="text-[10px] text-brand-secondary font-medium">In Transit - Out for Delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">On Time</span>
        </div>
      </div>

      {/* Delivery Progress */}
      <div className="bg-brand-secondary/5 rounded-2xl p-5 border border-brand-secondary/10 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-brand-accent/60">Shipped</span>
          </div>
          <div className="flex-grow h-[2px] bg-brand-primary/10 mx-2 relative overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 h-full bg-brand-primary"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-brand-primary">Transit</span>
          </div>
          <div className="flex-grow h-[2px] bg-brand-secondary/10 mx-2" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-secondary/5 text-brand-accent/40 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold text-brand-accent/60">Delivered</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-primary/5 flex items-center justify-center mt-1">
              <MapPin className="w-3 h-3 text-brand-primary" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-brand-dark">Current Location: Hub - Bangalore South</p>
              <p className="text-[9px] text-brand-secondary">Expected delivery by 6:00 PM today</p>
            </div>
          </div>
        </div>
      </div>

      {/* NDR / RTO Prevention Section */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-4 bg-white rounded-2xl border border-brand-secondary/10 shadow-sm flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-bold text-brand-secondary">AI NDR Shield</span>
          </div>
          <p className="text-xs font-bold text-brand-dark">Address Verified</p>
          <div className="h-1 w-full bg-brand-secondary/10 rounded-full overflow-hidden">
            <div className="h-full w-[95%] bg-brand-accent" />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-4 bg-white rounded-2xl border border-brand-secondary/10 shadow-sm flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-bold text-brand-secondary">Smart Connect</span>
          </div>
          <p className="text-xs font-bold text-brand-dark">IVR Confirmation</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-brand-accent/40 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Courier Logos Strip */}
      <div className="mt-auto pt-4 border-t border-brand-secondary/5 flex items-center justify-between opacity-80 grayscale">
        <div className="h-4 w-12 bg-brand-secondary/10 rounded" />
        <div className="h-4 w-12 bg-brand-secondary/10 rounded" />
        <div className="h-4 w-12 bg-brand-secondary/10 rounded" />
        <div className="h-4 w-12 bg-brand-secondary/10 rounded" />
      </div>

      {/* Floating Action Overlay */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-6 left-6 p-3 bg-white rounded-xl shadow-2xl border border-brand-secondary/10 flex items-center gap-3 z-20"
      >
        <div className="w-8 h-8 bg-brand-primary/5 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-brand-primary" />
        </div>
        <div>
          <p className="text-[9px] font-bold text-brand-accent/60 uppercase">Smart Routing</p>
          <p className="text-[11px] font-bold text-brand-dark">Bluedart Express</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SwiftShipVisual;
