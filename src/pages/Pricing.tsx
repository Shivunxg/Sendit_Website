import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Warehouse, Truck, BarChart3, ShieldCheck, Zap, Globe, Cpu, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-brand-dark text-white text-xs rounded-lg w-48 text-center pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-dark" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Pricing = ({ onContactClick }: { onContactClick: () => void }) => {
  const featureDescriptions: Record<string, string> = {
    "1 Warehouse": "Manage all operations from a single physical location.",
    "Barcode-based picking & putaway": "Reduce errors by scanning items during every movement.",
    "Basic inventory tracking": "Real-time updates on stock levels and movements.",
    "5 courier integrations": "Connect with top Indian carriers like Delhivery, BlueDart, etc.",
    "Basic rate comparison": "See shipping costs across different carriers side-by-side.",
    "Standard NDR handling": "Basic tools to manage non-delivery reports.",
    "Up to 3 warehouses": "Distribute stock across multiple regions for faster delivery.",
    "System-directed putaway": "The system tells you exactly where to store incoming stock.",
    "Wave & batch picking": "Optimize picker routes by grouping multiple orders together.",
    "15+ courier integrations": "Access a wider network of regional and national carriers.",
    "Smart auto-allocation": "Automatically choose the best carrier based on cost and SLA.",
    "Automated NDR workflows": "Sophisticated rules to handle failed deliveries automatically.",
    "SKU-level profitability dashboard": "See exactly how much you make on every single item sold.",
    "Unlimited warehouses": "Scale to any number of locations across the country.",
    "Custom workflows": "Tailor the WMS to your specific operational requirements.",
    "AI-based rate optimization": "Machine learning models to predict and secure the best rates.",
    "Rule-based routing": "Complex logic for order routing based on any criteria.",
    "Unified dashboard": "One single view for all your logistics data.",
    "API-first architecture": "Built to be integrated with any modern tech stack."
  };

  const plans = [
    {
      title: "Foundation",
      subtitle: "For single-warehouse D2C brands",
      cta: "Start Managing My Warehouse",
      highlight: false,
      sections: [
        {
          label: "Warehouse Management",
          icon: <Warehouse className="w-4 h-4" />,
          features: ["1 Warehouse", "Barcode-based picking & putaway", "Basic inventory tracking"]
        },
        {
          label: "Courier Orchestration",
          icon: <Truck className="w-4 h-4" />,
          features: ["5 courier integrations", "Basic rate comparison", "Standard NDR handling"]
        }
      ]
    },
    {
      title: "Orchestrated",
      subtitle: "For scaling brands managing complexity",
      cta: "Upgrade to Smart Orchestration",
      highlight: true,
      sections: [
        {
          label: "Warehouse Management",
          icon: <Warehouse className="w-4 h-4" />,
          features: ["Up to 3 warehouses", "System-directed putaway", "Wave & batch picking"]
        },
        {
          label: "Courier Orchestration",
          icon: <Truck className="w-4 h-4" />,
          features: ["15+ courier integrations", "Smart auto-allocation", "Automated NDR workflows"]
        },
        {
          label: "Analytics",
          icon: <BarChart3 className="w-4 h-4" />,
          features: ["SKU-level profitability dashboard"]
        }
      ]
    },
    {
      title: "Control Tower",
      subtitle: "For enterprise & 3PL operators",
      cta: "Talk to a Fulfillment Expert",
      highlight: false,
      sections: [
        {
          label: "Warehouse Management",
          icon: <Warehouse className="w-4 h-4" />,
          features: ["Unlimited warehouses", "Custom workflows"]
        },
        {
          label: "Courier Orchestration",
          icon: <Truck className="w-4 h-4" />,
          features: ["AI-based rate optimization", "Rule-based routing"]
        },
        {
          label: "Intelligence",
          icon: <Cpu className="w-4 h-4" />,
          features: ["Unified dashboard", "API-first architecture"]
        }
      ]
    }
  ];

  return (
    <div className="pt-44 pb-24 premium-hero selection:bg-brand-primary/10 selection:text-brand-primary min-h-screen">
      <Helmet>
        <title>Pricing Plans | Transparent Logistics Infrastructure Costs | Sendit</title>
        <meta name="description" content="Choose the right plan for your business. From early-stage D2C brands to enterprise-scale logistics, Sendit offers transparent and scalable pricing." />
        <link rel="canonical" href="https://sendit.in/pricing" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-brand-dark tracking-tight">
              Enterprise <span className="text-brand-primary">Solutions.</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
              Scale your fulfillment operations with predictable costs and enterprise-grade intelligence.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col p-8 transition-all duration-300 ${
                plan.highlight 
                  ? 'standard-card border-2 border-brand-primary scale-105 z-10' 
                  : 'standard-card hover:border-brand-secondary/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">{plan.title}</h3>
                <p className="text-brand-accent text-sm font-medium">{plan.subtitle}</p>
              </div>

              <div className="flex-grow space-y-8 mb-10">
                {plan.sections.map((section, j) => (
                  <div key={j}>
                    <div className="flex items-center gap-2 text-brand-dark font-bold text-xs uppercase tracking-wider mb-4 opacity-70">
                      {section.icon}
                      {section.label}
                    </div>
                    <ul className="space-y-3">
                      {section.features.map((feature, k) => (
                        <li key={k} className="flex items-start gap-3 group">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-brand-primary' : 'text-brand-accent'}`} />
                          <div className="flex items-center gap-1.5">
                            <span className="text-brand-dark/80 text-sm leading-snug">{feature}</span>
                            <Tooltip text={featureDescriptions[feature] || "Feature details coming soon"}>
                              <HelpCircle className="w-3.5 h-3.5 text-brand-accent/50 hover:text-brand-accent cursor-help transition-colors" />
                            </Tooltip>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                onClick={onContactClick}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-brand-primary text-white hover:bg-brand-secondary'
                    : plan.title === "Control Tower"
                      ? 'bg-white text-brand-dark border-2 border-brand-dark hover:bg-brand-secondary/5'
                      : 'bg-brand-dark text-white hover:bg-brand-dark/90'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-32 pt-24 border-t border-brand-secondary/10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">Enterprise Security</h4>
              <p className="text-brand-dark/70 text-sm">Bank-grade encryption and SOC2 compliant infrastructure.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">Instant Setup</h4>
              <p className="text-brand-dark/70 text-sm">Go live in days, not months with our plug-and-play integrations.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">Global Scale</h4>
              <p className="text-brand-dark/70 text-sm">Multi-currency and international shipping support built-in.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
