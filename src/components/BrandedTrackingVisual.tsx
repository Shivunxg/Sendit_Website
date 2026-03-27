import React from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  MapPin, 
  Star, 
  ShoppingBag, 
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';

const BrandedTrackingVisual = () => {
  return (
    <div className="w-full h-full bg-brand-secondary/5 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-inner border border-brand-secondary/10">
      {/* Phone Frame Mockup */}
      <div className="bg-white rounded-[2rem] border border-brand-secondary/10 shadow-xl flex flex-col h-full overflow-hidden">
        {/* App Header */}
        <div className="p-4 border-b border-brand-secondary/10 flex items-center justify-between">
          <div className="w-20 h-4 bg-brand-secondary/10 rounded" />
          <div className="w-6 h-6 rounded-full bg-brand-secondary/10" />
        </div>

        {/* Tracking Card */}
        <div className="p-4 space-y-4">
          <div className="bg-brand-primary rounded-2xl p-4 text-white shadow-lg shadow-brand-primary/20">
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">Estimated Delivery</p>
            <p className="text-lg font-bold">Today, by 6:00 PM</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-grow h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-white"
                />
              </div>
              <span className="text-[10px] font-bold">75%</span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="w-0.5 h-6 bg-brand-primary/10" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-dark">Out for Delivery</p>
                <p className="text-[8px] text-brand-accent/60">10:30 AM - Bangalore Hub</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <Clock className="w-2.5 h-2.5 text-brand-primary" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-accent">In Transit</p>
                <p className="text-[8px] text-brand-accent/40">08:15 AM - Sorting Facility</p>
              </div>
            </div>
          </div>

          {/* Upsell / Recommendation Widget */}
          <div className="mt-4 p-3 rounded-xl bg-brand-secondary/5 border border-brand-secondary/10">
            <p className="text-[9px] font-bold text-brand-accent/60 uppercase mb-2">Recommended for you</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg border border-brand-secondary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-brand-secondary/20" />
              </div>
              <div className="flex-grow">
                <div className="h-2 w-20 bg-brand-secondary/10 rounded mb-1" />
                <div className="h-2 w-12 bg-brand-secondary/5 rounded" />
              </div>
              <ArrowRight className="w-3 h-3 text-brand-secondary/20" />
            </div>
          </div>
        </div>

        {/* NPS / Feedback */}
        <div className="mt-auto p-4 bg-brand-secondary/5 border-t border-brand-secondary/10 flex items-center justify-between">
          <p className="text-[9px] font-bold text-brand-accent">Rate your experience</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-3 h-3 text-brand-secondary/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Marketing Badge */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 -right-4 p-3 bg-white rounded-xl shadow-xl border border-brand-secondary/10 flex items-center gap-2 z-20"
      >
        <div className="w-6 h-6 bg-brand-accent/10 rounded-lg flex items-center justify-center">
          <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
        </div>
        <p className="text-[10px] font-bold text-brand-dark">4.9/5 NPS Score</p>
      </motion.div>
    </div>
  );
};

export default BrandedTrackingVisual;
