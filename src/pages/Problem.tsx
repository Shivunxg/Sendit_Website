import { X, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Problem = () => {
  const [heroImage] = useState<string>("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200");

  const problems = [
    "What inventory is running low",
    "Which warehouse is underperforming",
    "Why shipping costs are rising",
    "Where margins are leaking",
    "How operations impact profitability"
  ];

  useEffect(() => {
    // Static image is now used, no AI generation needed.
  }, []);

  return (
    <div className="pt-32 pb-24 premium-hero">
      <Helmet>
        <title>The Problem | Why Traditional Logistics Fails | Sendit</title>
        <meta name="description" content="Traditional logistics is fragmented and inefficient. Discover how Sendit solves the core problems of inventory sync, courier selection, and warehouse execution." />
        <link rel="canonical" href="https://sendit.in/problem" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">The Logistics Gap</h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
              Most platforms only solve half the problem. We solve the part that actually impacts your margins.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Shipping Aggregators Are <span className="text-brand-accent">Not Enough.</span>
            </h2>
            <p className="text-lg text-brand-secondary mb-8 leading-relaxed">
              Generating labels is easy. Managing the operational complexity behind those labels is where most brands fail. Without unified data, you're flying blind.
            </p>
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-brand-primary" />
                  <span className="text-brand-dark font-medium text-lg">{problem}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-8 standard-card">
              <p className="text-xl text-brand-dark font-semibold">
                Disconnected systems create operational chaos. <br />
                <span className="text-brand-primary">Sendit was built to unify the entire lifecycle.</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-brand-dark rounded-3xl overflow-hidden flex items-center justify-center relative">
              <motion.img 
                key={heroImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={heroImage} 
                alt="Operational Control Tower" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-72 p-8 bg-brand-dark text-white rounded-3xl">
              <p className="text-sm font-medium opacity-70 mb-2">Industry Insight</p>
              <p className="text-xl font-bold">74% of Indian D2C brands cite "Fulfillment Inefficiency" as their #1 growth barrier.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
