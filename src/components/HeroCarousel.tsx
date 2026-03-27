import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Smart Warehousing",
    desc: "Real-time inventory tracking and automated storage solutions."
  },
  {
    url: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Order Processing",
    desc: "Seamless synchronization from storefront to warehouse floor."
  },
  {
    url: "https://images.unsplash.com/photo-1549194388-2469d59ec75c?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Precision Packaging",
    desc: "Optimized packing workflows to reduce dimensional weight."
  },
  {
    url: "https://images.unsplash.com/photo-1510511459019-5dee995d3ff4?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Last-Mile Delivery",
    desc: "Intelligent courier routing for the fastest delivery times."
  }
];

// Using stable seeds for picsum as requested for "static and do not change on refresh"
const picsumItems = [
  {
    url: "https://picsum.photos/seed/sendit-warehouse/1200/800",
    title: "Advanced Warehousing",
    desc: "Strategic storage nodes across India for faster fulfillment."
  },
  {
    url: "https://picsum.photos/seed/sendit-order/1200/800",
    title: "Order Orchestration",
    desc: "Unified command center for all your sales channels."
  },
  {
    url: "https://picsum.photos/seed/sendit-package/1200/800",
    title: "Smart Fulfillment",
    desc: "Automated picking and packing for zero-error operations."
  },
  {
    url: "https://picsum.photos/seed/sendit-delivery/1200/800",
    title: "Express Delivery",
    desc: "Connecting you to 29,000+ pin codes with top-tier couriers."
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % picsumItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % picsumItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + picsumItems.length) % picsumItems.length);

  return (
    <div className="w-full aspect-[4/3] bg-white rounded-[2.5rem] border border-brand-secondary/10 shadow-2xl overflow-hidden relative group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={picsumItems[currentIndex].url} 
            alt={picsumItems[currentIndex].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold mb-2">{picsumItems[currentIndex].title}</h3>
              <p className="text-sm text-brand-accent/40 font-medium max-w-md">{picsumItems[currentIndex].desc}</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={next}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-6 right-8 flex gap-2">
        {picsumItems.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-8 bg-brand-accent' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Live Badge */}
      <div className="absolute top-6 left-8">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-dark/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          Order Lifecycle
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
