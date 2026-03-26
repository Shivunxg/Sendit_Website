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
    <div className="w-full h-full bg-slate-50 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-inner border border-slate-200">
      {/* Phone Frame Mockup */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl flex flex-col h-full overflow-hidden">
        {/* App Header */}
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="w-20 h-4 bg-slate-100 rounded" />
          <div className="w-6 h-6 rounded-full bg-slate-100" />
        </div>

        {/* Tracking Card */}
        <div className="p-4 space-y-4">
          <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
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
                <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="w-0.5 h-6 bg-blue-100" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900">Out for Delivery</p>
                <p className="text-[8px] text-slate-400">10:30 AM - Bangalore Hub</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-2.5 h-2.5 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500">In Transit</p>
                <p className="text-[8px] text-slate-300">08:15 AM - Sorting Facility</p>
              </div>
            </div>
          </div>

          {/* Upsell / Recommendation Widget */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Recommended for you</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-100 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-slate-300" />
              </div>
              <div className="flex-grow">
                <div className="h-2 w-20 bg-slate-200 rounded mb-1" />
                <div className="h-2 w-12 bg-slate-100 rounded" />
              </div>
              <ArrowRight className="w-3 h-3 text-slate-300" />
            </div>
          </div>
        </div>

        {/* NPS / Feedback */}
        <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[9px] font-bold text-slate-500">Rate your experience</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-3 h-3 text-slate-200" />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Marketing Badge */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 -right-4 p-3 bg-white rounded-xl shadow-xl border border-slate-100 flex items-center gap-2 z-20"
      >
        <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center">
          <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
        </div>
        <p className="text-[10px] font-bold text-slate-900">4.9/5 NPS Score</p>
      </motion.div>
    </div>
  );
};

export default BrandedTrackingVisual;
