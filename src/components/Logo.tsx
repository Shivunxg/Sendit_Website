import React from 'react';
import { motion } from 'motion/react';

const Logo = ({ className = "h-12" }: { className?: string }) => {
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
      {/* Enhanced Subtle Glow Effect */}
      <motion.div 
        className="absolute -inset-4 bg-brand-primary/15 blur-2xl rounded-full z-0"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -inset-2 bg-brand-accent/10 blur-xl rounded-full z-0"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <img 
        src="/logo.png" 
        alt="Sendit Logo" 
        className={`w-auto object-contain mix-blend-multiply contrast-[1.15] brightness-[1.08] relative z-10 drop-shadow-sm ${className}`}
      />
    </motion.div>
  );
};

export default Logo;
