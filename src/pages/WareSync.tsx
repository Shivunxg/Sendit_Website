import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
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
  ArrowDown
} from 'lucide-react';

const WareSync = ({ onContactClick }: { onContactClick: () => void }) => {
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200");
  const [wmsImage, setWmsImage] = useState<string>("https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200");
  const [omsImage, setOmsImage] = useState<string>("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200");
  const [inventoryImage, setInventoryImage] = useState<string>("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200");
  const [omniImage, setOmniImage] = useState<string>("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200");
  const [unirecoImage, setUnirecoImage] = useState<string>("https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200");
  
  const [isHeroGenerating, setIsHeroGenerating] = useState(false);
  const [isWmsGenerating, setIsWmsGenerating] = useState(false);
  const [isOmsGenerating, setIsOmsGenerating] = useState(false);
  const [isInventoryGenerating, setIsInventoryGenerating] = useState(false);
  const [isOmniGenerating, setIsOmniGenerating] = useState(false);
  const [isUnirecoGenerating, setIsUnirecoGenerating] = useState(false);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const generateHeroImage = async () => {
      setIsHeroGenerating(true);
      try {
        const prompt = `A modern, well-organized e-commerce fulfillment warehouse. Workers are scanning products and packing orders at clean workstations. Shelves are neatly arranged with labeled inventory boxes. In the foreground, a tablet or large monitor displays a clean e-commerce operations dashboard showing:
- Order volume growth chart
- Inventory levels
- Warehouse performance metrics
- Shipping status overview
The dashboard should look realistic but not contain readable text.

Style:
Natural lighting
Professional photography style
Ultra high resolution
Clean and modern environment
Realistic proportions
No exaggerated futuristic effects
No text overlay
No logos

Mood:
Efficient, organized, scalable operations
Technology-enabled growth
Confident and reliable`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating hero image:", error);
      } finally {
        setIsHeroGenerating(false);
      }
    };

    const generateWmsImage = async () => {
      setIsWmsGenerating(true);
      try {
        const prompt = `A clean, organized warehouse interior with clearly structured racks, bins, and barcoded inventory. Mobile handheld scanners rest on packing stations. A large wall-mounted screen shows a warehouse control dashboard with picking queues, bin locations, and performance metrics (no readable text).

Style:
Realistic photography
Neutral color palette
Professional lighting
Minimal clutter
No people
No text overlays
No logos

Mood:
Total warehouse control
Operational visibility
System-driven efficiency`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setWmsImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating WMS image:", error);
      } finally {
        setIsWmsGenerating(false);
      }
    };

    const generateOmsImage = async () => {
      setIsOmsGenerating(true);
      try {
        const prompt = `A professional e-commerce order management dashboard displayed on a modern computer screen. The UI shows a list of incoming orders from various marketplaces (Amazon, Flipkart, Shopify) with status tags like "Processing", "Shipped", and "Out for Delivery". There are small charts showing order distribution by channel.

Style:
Clean SaaS interface
Professional office environment
Soft depth of field
Realistic lighting
No readable text
No logos

Mood:
Unified control
Operational clarity
Efficiency`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setOmsImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating OMS image:", error);
      } finally {
        setIsOmsGenerating(false);
      }
    };

    const generateInventoryImage = async () => {
      setIsInventoryGenerating(true);
      try {
        const prompt = `A high-tech inventory analytics dashboard showing SKU-level data, aging reports, and stock velocity heatmaps. The background is a blurred view of a modern warehouse. The dashboard looks like a premium enterprise software.

Style:
Data-rich UI
Modern analytics aesthetic
Blue and emerald color palette
Professional lighting
No readable text

Mood:
Intelligence
Precision
Control`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setInventoryImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating inventory image:", error);
      } finally {
        setIsInventoryGenerating(false);
      }
    };

    const generateOmniImage = async () => {
      setIsOmniGenerating(true);
      try {
        const prompt = `A modern retail store interior where a staff member is using a mobile tablet to fulfill an online order (Ship from Store). The store is well-lit and premium. In the background, there are customers browsing.

Style:
Lifestyle photography
Modern retail environment
Warm lighting
Professional quality
No readable text

Mood:
Connected
Convenient
Modern retail`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setOmniImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating omni image:", error);
      } finally {
        setIsOmniGenerating(false);
      }
    };

    const generateUnirecoImage = async () => {
      setIsUnirecoGenerating(true);
      try {
        const prompt = `A professional financial reconciliation dashboard for an e-commerce enterprise. The UI shows a side-by-side comparison of marketplace statements versus internal order records. There are green checkmarks indicating matched transactions, and a few red flags for discrepancies. Clean bar charts show "Recovered Amount" and "Pending Claims".

Style:
Clean, professional fintech UI
Modern dashboard aesthetic
Soft depth of field
Realistic office lighting
No readable text
No logos

Mood:
Trustworthy
Precise
Automated
Financial clarity`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setUnirecoImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating UniReco image:", error);
      } finally {
        setIsUnirecoGenerating(false);
      }
    };

    generateHeroImage();
    generateWmsImage();
    generateOmsImage();
    generateInventoryImage();
    generateOmniImage();
    generateUnirecoImage();
  }, []);

  const coreModules = [
    {
      title: "Warehouse Management (WMS)",
      desc: "Enterprise-grade WMS for B2B and B2C. Optimize operations with handheld support, system-directed putaway, and 100% scan-based accuracy for GRN and picking.",
      icon: <Warehouse className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Order Management (OMS)",
      desc: "Centralize orders from 50+ marketplaces like Amazon, Flipkart, and Myntra. Automated order routing and real-time inventory sync to prevent overselling.",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Inventory Intelligence",
      desc: "Unified view of stock across all warehouses and stores. Advanced SKU-level tracking with FEFO/FIFO logic and automated reorder triggers.",
      icon: <Database className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Omnichannel Retail",
      desc: "Bridge the gap between online and offline. Enable 'Ship from Store', 'Click and Collect', and hyperlocal fulfillment to delight modern shoppers.",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const advancedFeatures = [
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
    },
    {
      title: "Barcode-Enabled Picking",
      desc: "Group orders for maximum efficiency with wave picking and 100% scan-based accuracy.",
      icon: <Zap className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100">
              <ShieldCheck className="w-3 h-3" /> Enterprise-Grade WMS
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1]">
              Simplify E-commerce, <br />
              <span className="text-emerald-600">Accelerate Growth.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              WareSync is an integrated e-commerce enablement SaaS platform designed to streamline operations for D2C brands, retailers, and marketplaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20"
              >
                Book a Demo <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <button 
                onClick={onContactClick}
                className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-xl hover:bg-slate-50 transition-all"
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
            <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50 p-4 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
              <motion.img 
                key={heroImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={heroImage} 
                alt="WareSync Fulfillment Operations" 
                className="rounded-[2rem] w-full h-full object-cover shadow-inner"
                referrerPolicy="no-referrer"
              />
              {isHeroGenerating && (
                <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold border border-white/20">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  AI Refining...
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-[200px]">
              <p className="text-3xl font-bold text-emerald-600 mb-1">99.9%</p>
              <p className="text-sm font-medium text-slate-500">Inventory Accuracy across 100+ Warehouses</p>
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
              className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 hover:border-emerald-500/50 transition-all group cursor-pointer"
              onClick={() => setSelectedModule(i)}
            >
              <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {module.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{module.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{module.desc}</p>
              <button className="flex items-center gap-2 font-bold text-black hover:gap-3 transition-all">
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
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${coreModules[selectedModule].color} flex items-center justify-center`}>
                      {coreModules[selectedModule].icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{coreModules[selectedModule].title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
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
                          <h4 className="text-3xl font-display font-bold mb-6">Advanced WMS: <br /><span className="text-emerald-600">Total Warehouse Control</span></h4>
                          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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
                                <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                                <span className="text-slate-700 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-square">
                          <img 
                            src={wmsImage} 
                            alt="WMS Operations" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule === 1 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Unified OMS: <br /><span className="text-blue-600">Sell Everywhere, Manage Here</span></h4>
                          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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
                                <CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0" />
                                <span className="text-slate-700 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-square">
                          <img 
                            src={omsImage} 
                            alt="OMS Operations" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule === 2 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Inventory Intelligence: <br /><span className="text-purple-600">Data-Driven Stock Control</span></h4>
                          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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
                                <CheckCircle2 className="text-purple-500 w-5 h-5 shrink-0" />
                                <span className="text-slate-700 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-square">
                          <img 
                            src={inventoryImage} 
                            alt="Inventory Intelligence" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModule === 3 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Omnichannel Fulfillment: <br /><span className="text-orange-600">Ship from Store</span></h4>
                          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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
                                <CheckCircle2 className="text-orange-500 w-5 h-5 shrink-0" />
                                <span className="text-slate-700 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-square">
                          <img 
                            src={omniImage} 
                            alt="Omnichannel Fulfillment" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-slate-500 text-sm font-medium">Ready to see this in action for your business?</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedModule(null);
                      onContactClick();
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 group"
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
        <div className="bg-slate-50 rounded-[3.5rem] p-12 md:p-24 text-slate-900 overflow-hidden relative mb-32 border border-slate-100">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                One-stop All <br />
                <span className="text-emerald-600">Automation Needs.</span>
              </h2>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                From payment reconciliation to multi-vendor management, WareSync provides the deep operational tools required by modern enterprises.
              </p>
              <div className="space-y-8">
                {advancedFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
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
                      <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0" />
                      <span className="text-lg text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onContactClick}
                  className="w-full mt-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                >
                  Speak with Our Expert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Scale Your Operations?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Join 7,000+ global brands that trust our technology to power their fulfillment.
          </p>
          <button 
            onClick={onContactClick}
            className="px-12 py-5 bg-black text-white rounded-full font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl"
          >
            Start Your Transformation
          </button>
        </div>
      </div>
    </div>
  );
};

export default WareSync;
