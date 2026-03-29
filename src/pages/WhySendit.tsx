import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Layers, 
  Zap, 
  Lock, 
  Globe, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  FileText, 
  Cpu, 
  BarChart3, 
  Unplug, 
  Network,
  Maximize2,
  Minimize2,
  Box,
  Plus,
  Minus,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

import OrderLifecycle from '../components/OrderLifecycle';

const AdvantageCard = ({ 
  title, 
  them, 
  us, 
  iconThem: IconThem, 
  iconUs: IconUs,
  delay = 0 
}: { 
  title: string; 
  them: string; 
  us: string; 
  iconThem: any; 
  iconUs: any;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="standard-card p-8 flex flex-col h-full group hover:border-brand-primary/20 transition-colors"
  >
    <div className="mb-8">
      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-primary/10 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
        {title}
      </span>
    </div>
    
    <div className="flex-grow space-y-8">
      {/* Typical Aggregator */}
      <div className="flex items-start gap-4 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-brand-secondary/5 flex items-center justify-center shrink-0">
          <IconThem className="w-5 h-5 text-brand-accent/40" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-brand-accent/60 uppercase tracking-wider mb-1">Typical Aggregator</p>
          <p className="text-brand-accent/80 font-medium">{them}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-brand-secondary/10 w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-0.5 rounded-full border border-brand-secondary/10 text-[10px] font-bold text-brand-accent/60 uppercase tracking-widest">VS</div>
      </div>

      {/* Sendit */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/20">
          <IconUs className="w-5 h-5 text-brand-primary" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-brand-primary uppercase tracking-wider mb-1">Sendit Advantage</p>
          <p className="text-brand-dark font-bold text-lg leading-tight">{us}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

interface FAQItemProps {
  key?: React.Key;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="border-b border-brand-secondary/10 last:border-none">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-primary' : 'text-brand-dark group-hover:text-brand-primary'}`}>
        {question}
      </span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-primary text-white rotate-180' : 'bg-brand-secondary/5 text-brand-accent/40 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'}`}>
        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-brand-accent/80 leading-relaxed">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const WhySendit = ({ onContactClick }: { onContactClick: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What makes Sendit's core offering different from other aggregators?",
      answer: "Unlike typical aggregators that focus solely on courier rate comparison, Sendit provides a unified logistics operating system. We combine Shipping, Inventory Management, and Warehouse Execution into a single platform, giving you end-to-end control over your fulfillment lifecycle."
    },
    {
      question: "How does Sendit improve visibility across operations?",
      answer: "Most platforms leave you blind to what's happening inside the warehouse. Sendit offers real-time stock intelligence and granular visibility into every stage of an order—from the moment it's placed to the final mile delivery."
    },
    {
      question: "What is the 'execution layer' and why is it important?",
      answer: "The execution layer is our built-in Warehouse Management System (WMS). It handles the actual physical movement of goods—picking, packing, and QC workflows. This ensures that what you see in your dashboard is exactly what's happening on the warehouse floor, reducing errors and increasing speed."
    },
    {
      question: "What kind of analytics can I expect with Sendit?",
      answer: "We go beyond basic shipping costs. Sendit provides deep shipment profitability analytics, allowing you to see the true cost of every order, including packaging, labor, and courier fees, helping you optimize your bottom line."
    },
    {
      question: "How does Sendit integrate with my existing tech stack?",
      answer: "Sendit is built for deep operational integration. We connect seamlessly with major storefronts, ERPs, and over 50+ courier partners. Our goal is to become your operational source of truth, not just another tool in your stack."
    },
    {
      question: "Is Sendit built to handle multi-warehouse scalability?",
      answer: "Absolutely. Our architecture is designed for multi-warehouse operations. Whether you're shipping from one location or ten, Sendit allows you to manage inventory and route orders elastically based on stock availability and proximity to the customer."
    }
  ];

  return (
    <div className="pt-44 pb-24 premium-hero min-h-screen">
      <Helmet>
        <title>Why Sendit | The Logistics Operating System for India</title>
        <meta name="description" content="Discover why Sendit is the preferred logistics operating system for high-growth Indian brands. Unified infrastructure, deep integrations, and scale-ready." />
        <link rel="canonical" href="https://sendit.in/why-sendit" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Why Choose Us
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              The <span className="text-brand-primary font-bold">Sendit</span> Advantage
            </h1>
            <p className="text-xl text-brand-accent/80 max-w-2xl mx-auto leading-relaxed">
              We don't just generate labels. We power the entire fulfillment lifecycle with intelligence and scale.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Advantage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <AdvantageCard 
            title="Core Offering"
            them="Only courier rate comparison"
            us="Shipping + Inventory + Warehouse"
            iconThem={FileText}
            iconUs={Layers}
            delay={0.1}
          />
          <AdvantageCard 
            title="Visibility"
            them="No inventory visibility"
            us="Real-time stock intelligence"
            iconThem={EyeOff}
            iconUs={Eye}
            delay={0.2}
          />
          <AdvantageCard 
            title="Execution"
            them="No warehouse execution layer"
            us="Full WMS workflows"
            iconThem={Box}
            iconUs={Cpu}
            delay={0.3}
          />
          <AdvantageCard 
            title="Analytics"
            them="Limited cost visibility"
            us="Shipment profitability analytics"
            iconThem={TrendingUp}
            iconUs={BarChart3}
            delay={0.4}
          />
          <AdvantageCard 
            title="Integration"
            them="Easy to switch"
            us="Deep operational integration"
            iconThem={Unplug}
            iconUs={Network}
            delay={0.5}
          />
          <AdvantageCard 
            title="Scalability"
            them="Single warehouse focus"
            us="Multi-warehouse architecture"
            iconThem={Minimize2}
            iconUs={Maximize2}
            delay={0.6}
          />
        </div>

        {/* Visual Lifecycle Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-4">
              Operational Flow
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">Unified Fulfillment Lifecycle</h2>
            <p className="text-brand-accent/70">One system, from order placement to final mile delivery.</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <OrderLifecycle />
          </motion.div>
        </div>

        {/* Security & Scale - Simplified Widgets */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="standard-card p-10 relative overflow-hidden group hover:border-brand-primary/20 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-8 border border-brand-primary/20">
                <ShieldCheck className="text-brand-primary w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-6 text-brand-dark">Enterprise Security</h2>
              <p className="text-brand-accent/80 mb-10 leading-relaxed">
                Your operational data is your most valuable asset. We protect it with enterprise-grade security protocols.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["SOC2 Compliant", "RBAC Access", "99.9% Uptime", "Audit Logs"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold text-brand-accent/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="standard-card p-10 relative overflow-hidden group hover:border-brand-accent/20 transition-colors"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-8 border border-brand-accent/20">
                <Zap className="text-brand-accent w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-6 text-brand-dark">Built for Scale</h2>
              <p className="text-brand-accent/80 mb-10 leading-relaxed">
                Whether you ship 100 orders or 100,000, our architecture scales elastically with your business.
              </p>
              <button 
                onClick={onContactClick}
                className="px-8 py-4 bg-brand-accent text-white rounded-xl font-bold hover:bg-brand-secondary transition-all flex items-center gap-2 group"
              >
                Scale with <span className="text-brand-primary font-bold">Sendit</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-4 h-4" /> Common Questions
            </div>
            <h2 className="text-4xl font-display font-bold text-brand-dark">Frequently Asked Questions</h2>
          </div>
          
          <div className="standard-card p-8 md:p-12">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <p className="text-brand-accent/60 text-sm font-bold uppercase tracking-widest mb-8">Ready to see the difference?</p>
          <Link to="/pricing" className="inline-flex items-center gap-2 text-2xl font-display font-bold text-brand-dark hover:text-brand-primary transition-colors group">
            Explore our pricing plans <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhySendit;
