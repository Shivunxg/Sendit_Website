import React from 'react';
import { motion } from 'motion/react';

const Logo = ({ className = "h-14" }: { className?: string }) => {
  return (
    <motion.div 
      className="flex items-center relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: [0, -4, 0]
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        x: { duration: 0.5 },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
    >
      {/* Subtle Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <img 
        src="/logo.png" 
        alt="Sendit Logo" 
        className={`w-auto object-contain relative z-10 ${className}`}
      />
    </motion.div>
  );
};

export default Logo;
