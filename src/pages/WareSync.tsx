import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Warehouse, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Boxes, 
  Layers, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Layout, 
  Database,
  Search,
  ShoppingCart,
  DollarSign,
  Loader2,
  X,
  Activity,
  Globe,
  Smartphone,
  MessageSquare,
  Clock,
  Truck,
  ArrowDown,
  ScanBarcode
} from 'lucide-react';

import WMSDashboard from '../components/WMSDashboard';
import { WMSVisual, OMSVisual, InventoryVisual, OmnichannelVisual } from '../components/WareSyncVisuals';

const WareSync = ({ onContactClick }: { onContactClick: () => void }) => {
  const [wmsImage] = useState<string>("https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200");
  const [omsImage] = useState<string>("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200");
  const [inventoryImage] = useState<string>("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200");
  const [omniImage] = useState<string>("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200");
  const [unirecoImage] = useState<string>("https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200");
  
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const scrollToCaseStudies = () => {
    const element = document.getElementById('case-studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Static images are now used, no AI generation needed.
  }, []);

  const coreModules = [
    {
      title: "Warehouse Management (WMS)",
      desc: "Enterprise-grade WMS for B2B and B2C. Optimize operations with handheld support, system-directed putaway, and 100% scan-based accuracy for GRN and picking.",
      icon: <Warehouse className="w-6 h-6" />,
      color: "bg-brand-accent/10 text-brand-accent",
      stats: [
        { label: "Accuracy", value: "99.9%" },
        { label: "Efficiency", value: "+35%" }
      ]
    },
    {
      title: "Order Management (OMS)",
      desc: "Centralize orders from 50+ marketplaces like Amazon, Flipkart, and Myntra. Automated order routing and real-time inventory sync to prevent overselling.",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-brand-primary/10 text-brand-primary",
      stats: [
        { label: "Integrations", value: "50+" },
        { label: "Sync Speed", value: "< 2m" }
      ]
    },
    {
      title: "Inventory Intelligence",
      desc: "Unified view of stock across all warehouses and stores. Advanced SKU-level tracking with FEFO/FIFO logic and automated reorder triggers.",
      icon: <Database className="w-6 h-6" />,
      color: "bg-brand-secondary/10 text-brand-secondary",
      stats: [
        { label: "Visibility", value: "100%" },
        { label: "Stockouts", value: "-42%" }
      ]
    },
    {
      title: "Omnichannel Retail",
      desc: "Bridge the gap between online and offline. Enable 'Ship from Store', 'Click and Collect', and hyperlocal fulfillment to delight modern shoppers.",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "bg-brand-accent/10 text-brand-accent",
      stats: [
        { label: "Fulfillment", value: "Hybrid" },
        { label: "CSAT", value: "4.8/5" }
      ]
    }
  ];

  const advancedFeatures = [
    {
      title: "Barcode-Enabled Picking & Packing",
      desc: "Group orders for maximum efficiency with wave picking and 100% scan-based accuracy. Eliminate manual errors completely.",
      icon: <ScanBarcode className="w-6 h-6" />,
      highlight: true
    },
    {
      title: "UniReco Reconciliation",
      desc: "Save up to 5% of your GMV. Match orders, payments, and returns effortlessly across marketplaces and resolve discrepancies in real-time.",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: "Multi-Vendor Seller Panel",
      desc: "Run your own marketplace. Manage vendors, supply-side operations, and marketplace payouts with extensive market coverage.",
      icon: <Layout className="w-5 h-5" />
    },
    {
      title: "Smart Bin Allocation",
      desc: "Optimize space with system-directed putaway based on item velocity and storage constraints.",
      icon: <Boxes className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-32 pb-24 premium-hero selection:bg-brand-primary/10 selection:text-brand-primary">
      <Helmet>
        <title>WareSync | Multi-Channel Inventory & Warehouse Management</title>
        <meta name="description" content="Sync inventory across 50+ marketplaces and webstores. Automate order routing and optimize warehouse execution with WareSync. Built for scale." />
        <link rel="canonical" href="https://sendit.in/waresync" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-6 border border-brand-accent/20">
              <ShieldCheck className="w-3 h-3" /> Enterprise-Grade WMS
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1]">
              Simplify E-commerce, <br />
              <span className="text-brand-accent">Accelerate Growth.</span>
            </h1>
            <p className="text-xl text-brand-dark/80 mb-10 leading-relaxed max-w-xl">
              WareSync is an integrated e-commerce enablement SaaS platform designed to streamline operations for D2C brands, retailers, and marketplaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="px-10 py-5 bg-brand-primary text-white rounded-full font-bold text-xl hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 group"
              >
                Book a Demo <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <button 
                onClick={scrollToCaseStudies}
                className="px-10 py-5 bg-white text-brand-dark border border-brand-secondary/10 rounded-full font-bold text-xl hover:bg-brand-secondary/5 transition-all"
              >
                View Case Studies
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <WMSDashboard />
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl border border-brand-secondary/10 max-w-[220px] z-20">
              <p className="text-3xl font-bold text-brand-accent mb-1">99.9%</p>
              <p className="text-sm font-medium text-brand-accent">Inventory Accuracy across 100+ Warehouses</p>
            </div>
          </motion.div>
        </div>

        {/* Core Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {coreModules.map((module, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 standard-card hover:border-brand-accent/50 transition-all group cursor-pointer"
              onClick={() => setSelectedModule(i)}
            >
              <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {module.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{module.title}</h3>
              <p className="text-brand-dark/70 text-lg leading-relaxed mb-8">{module.desc}</p>
              
              {/* Animated Stats Data */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {module.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-brand-secondary/10">
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">{stat.label}</p>
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (i * 0.1) + (idx * 0.1) + 0.3 }}
                      className="text-xl font-bold text-brand-dark"
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 font-bold text-brand-primary hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Module Elaboration Modal */}
        <AnimatePresence>
          {selectedModule !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedModule(null)}
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-brand-secondary/10 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${coreModules[selectedModule].color} flex items-center justify-center`}>
                      {coreModules[selectedModule].icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{coreModules[selectedModule].title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="p-2 hover:bg-brand-secondary/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-grow overflow-y-auto p-8 md:p-12">
                  {selectedModule === 0 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Advanced WMS: <br /><span className="text-brand-accent">Total Warehouse Control</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Optimize every inch of your warehouse with our mobile-first WMS. From automated GRN to system-directed putaway, WareSync ensures that your operations are fast, accurate, and scalable.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "Handheld/Mobile App support for all operations",
                              "System-directed putaway & binning logic",
                              "Wave, Batch, and Cluster picking for high efficiency",
                              "Real-time labor productivity & performance tracking",
                              "Customizable QC & multi-stage packing workflows"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-accent w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-brand-secondary/20 aspect-square">
                          <WMSVisual />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2">Live Preview</p>
                            <p className="text-xl font-bold">Smart Bin Allocation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule === 1 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Unified OMS: <br /><span className="text-brand-primary">Sell Everywhere, Manage Here</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Centralize your orders from 50+ marketplaces and webstores. Our OMS provides a single source of truth for all your sales channels.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "Centralized order processing for Amazon, Flipkart, Myntra, etc.",
                              "Automated order routing to the nearest fulfillment center",
                              "Bulk label generation & marketplace-compliant invoicing",
                              "Real-time inventory sync to prevent stockouts & overselling",
                              "Integrated returns management & QC workflows"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-primary w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-brand-secondary/20 aspect-square">
                          <OMSVisual />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2">Live Preview</p>
                            <p className="text-xl font-bold">50+ Marketplace Sync</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule === 2 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Inventory Intelligence: <br /><span className="text-brand-secondary">Data-Driven Stock Control</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Move beyond simple stock counting. WareSync provides deep insights into your inventory health, helping you identify slow-moving items and prevent stockouts.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "SKU-level aging, velocity & turnover reports",
                              "Automated reorder point (ROP) alerts & purchase suggestions",
                              "Batch & Expiry tracking with FEFO/FIFO/LIFO logic",
                              "Virtual inventory & buffer stock management per channel",
                              "Cycle counting & blind audit support via mobile app"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-secondary w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-brand-secondary/20 aspect-square">
                          <InventoryVisual />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2">Live Preview</p>
                            <p className="text-xl font-bold">Stock Velocity Analytics</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule === 3 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Omnichannel Fulfillment: <br /><span className="text-brand-accent">Ship from Store</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Transform your retail stores into mini-fulfillment centers. Enable hyperlocal deliveries and reduce shipping costs by fulfilling orders from the nearest location.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "Real-time store inventory visibility & global stock pool",
                              "Geofencing-based intelligent order routing",
                              "In-store picking, packing & billing apps",
                              "Hyperlocal delivery partner integrations (Dunzo, Shadowfax)",
                              "Click & Collect (BOPIS) enablement for retail stores"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-accent w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-brand-secondary/20 aspect-square">
                          <OmnichannelVisual />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2">Live Preview</p>
                            <p className="text-xl font-bold">Hyperlocal Routing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-brand-secondary/10 bg-brand-secondary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-brand-accent text-sm font-medium">Ready to see this in action for your business?</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedModule(null);
                      onContactClick();
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 group"
                  >
                    Book a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Feature Elaborations - Removed as they are now in the modal */}

        {/* Advanced Features List */}
        <div className="bg-brand-secondary/5 rounded-[3.5rem] p-12 md:p-24 text-brand-dark overflow-hidden relative mb-32 border border-brand-secondary/10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px]" />
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                One-stop All <br />
                <span className="text-brand-accent">Automation Needs.</span>
              </h2>
              <p className="text-xl text-brand-dark/80 mb-12 leading-relaxed">
                From payment reconciliation to multi-vendor management, WareSync provides the deep operational tools required by modern enterprises.
              </p>
              <div className="space-y-6">
                {advancedFeatures.map((f: any, i) => (
                  <motion.div 
                    key={i} 
                    initial={f.highlight ? { scale: 0.95, opacity: 0 } : {}}
                    whileInView={f.highlight ? { scale: 1, opacity: 1 } : {}}
                    viewport={{ once: true }}
                    className={`flex items-start gap-6 p-6 rounded-[2rem] transition-all duration-500 ${
                      f.highlight 
                        ? 'bg-brand-accent text-white -mx-4 md:-mx-8 border border-brand-accent/30' 
                        : 'hover:bg-white hover:border-brand-secondary/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      f.highlight ? 'bg-white text-brand-accent' : 'bg-brand-accent/10 text-brand-accent'
                    }`}>
                      {f.icon}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${f.highlight ? 'text-white' : ''}`}>
                        {f.title}
                        {f.highlight && (
                          <span className="ml-3 text-[10px] bg-white/20 px-2 py-1 rounded-full uppercase tracking-widest">Featured</span>
                        )}
                      </h4>
                      <p className={`${f.highlight ? 'text-white' : 'text-brand-dark/70'} leading-relaxed`}>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-8 standard-card">
                <h3 className="text-2xl font-bold mb-6">Why Enterprises Choose Us?</h3>
                <ul className="space-y-6">
                  {[
                    "280+ Plug & Play Integrations",
                    "Real-time Inventory Sync across 50+ Marketplaces",
                    "Automated GRN & Smart Putaway Workflows",
                    "Hyperlocal & 'Ship from Store' Enablement",
                    "Advanced Payment Reconciliation (UniReco)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="text-brand-accent w-6 h-6 shrink-0" />
                      <span className="text-lg text-brand-dark">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onContactClick}
                  className="w-full mt-10 py-5 bg-brand-accent text-white rounded-2xl font-bold text-xl hover:bg-brand-accent/90 transition-all"
                >
                  Speak with Our Expert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        <div id="case-studies" className="mb-32 scroll-mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">See how leading brands are transforming their warehouse operations with WareSync.</p>
          </div>

          <div className="standard-card overflow-hidden border border-brand-secondary/10">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
                  alt="Case Study Brand" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent text-white text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                    Fashion & Apparel
                  </div>
                  <h3 className="text-4xl font-display font-bold text-white mb-2">Vibrant D2C</h3>
                  <p className="text-white/80 text-lg">Scaling to 5,000+ daily orders with zero errors.</p>
                </div>
              </div>
              <div className="p-10 lg:p-16 bg-white">
                <div className="space-y-10">
                  <div>
                    <h4 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">The Challenge</h4>
                    <p className="text-xl text-brand-dark leading-relaxed italic">
                      "Scaling to 5,000+ daily orders across 10+ marketplaces led to massive inventory discrepancies and delayed shipments. Our warehouse was a bottleneck."
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">The Solution</h4>
                    <p className="text-lg text-brand-dark/70 leading-relaxed">
                      Implemented WareSync's unified OMS and mobile-first WMS to centralize stock control and automate picking workflows.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-secondary/10">
                    <div>
                      <p className="text-3xl font-bold text-brand-accent mb-1">99.9%</p>
                      <p className="text-xs font-medium text-brand-accent uppercase tracking-wider">Accuracy</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-brand-primary mb-1">+45%</p>
                      <p className="text-xs font-medium text-brand-accent uppercase tracking-wider">Speed</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-brand-secondary mb-1">60%</p>
                      <p className="text-xs font-medium text-brand-accent uppercase tracking-wider">Reduction</p>
                    </div>
                  </div>

                  <button 
                    onClick={onContactClick}
                    className="inline-flex items-center gap-2 font-bold text-brand-primary hover:gap-3 transition-all border-b-2 border-brand-primary pb-1"
                  >
                    Read Full Story <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Scale Your Operations?</h2>
          <p className="text-xl text-brand-dark/80 mb-10">
            Join 7,000+ global brands that trust our technology to power their fulfillment.
          </p>
          <button 
            onClick={onContactClick}
            className="px-12 py-5 bg-brand-dark text-white rounded-full font-bold text-xl hover:bg-brand-dark/90 transition-all"
          >
            Start Your Transformation
          </button>
        </div>
      </div>
    </div>
  );
};

export default WareSync;
