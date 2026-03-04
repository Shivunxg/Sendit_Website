import { Warehouse, Truck, CheckCircle2, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const Products = ({ onContactClick }: { onContactClick: () => void }) => {
  const [waresyncImage, setWaresyncImage] = useState<string>("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200");
  const [swiftshipImage, setSwiftshipImage] = useState<string>("https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=1200");
  const [isWaresyncGenerating, setIsWaresyncGenerating] = useState(false);
  const [isSwiftshipGenerating, setIsSwiftshipGenerating] = useState(false);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const generateWaresyncImage = async () => {
      setIsWaresyncGenerating(true);
      try {
        const prompt = `A modern, high-tech warehouse management system (WMS) interface. A worker in a clean, organized warehouse is using a tablet that shows a sophisticated inventory dashboard with real-time stock levels, bin locations, and fulfillment metrics. The warehouse has neatly arranged racks and automated systems.

Style:
Professional photography
Clean UI design
Natural lighting
High resolution
No readable text
No logos

Mood:
Efficient
Organized
Technologically advanced`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setWaresyncImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating WareSync image:", error);
      } finally {
        setIsWaresyncGenerating(false);
      }
    };

    const generateSwiftshipImage = async () => {
      setIsSwiftshipGenerating(true);
      try {
        const prompt = `A modern e-commerce shipping orchestration dashboard. The screen shows a map of India with multiple delivery routes, courier partner performance charts, and real-time shipment status updates. The background is a blurred view of a busy shipping hub.

Style:
Clean SaaS UI
Professional environment
Soft lighting
High resolution
No readable text
No logos

Mood:
Connected
Reliable
Fast`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            },
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setSwiftshipImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating SwiftShip image:", error);
      } finally {
        setIsSwiftshipGenerating(false);
      }
    };

    generateWaresyncImage();
    generateSwiftshipImage();
  }, []);
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our Products</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sendit combines two powerful products into a unified logistics operating system.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* WareSync */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 flex flex-col"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
              <Warehouse className="text-emerald-600 w-8 h-8" />
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video bg-slate-200 border border-slate-200 shadow-inner">
              <motion.img 
                key={waresyncImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={waresyncImage} 
                alt="WareSync Operations" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {isWaresyncGenerating && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold border border-white/10">
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  AI Refining...
                </div>
              )}
            </div>

            <h3 className="text-4xl font-display font-bold mb-2">WareSync</h3>
            <p className="text-emerald-600 font-semibold mb-6">Inventory & Warehouse Management System</p>
            <p className="text-slate-600 mb-8 text-lg">Gain real-time control over stock, storage, and fulfillment workflows.</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Live multi-warehouse inventory visibility",
                "SKU-level analytics & stock aging reports",
                "GRN, putaway & smart bin allocation",
                "Barcode-enabled picking & packing",
                "UniReco Payment Reconciliation",
                "Omnichannel 'Ship from Store' enablement"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 group"
              >
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <Link 
                to="/products/waresync"
                className="flex-grow py-4 bg-white text-black border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Learn More <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* SwiftShip */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 flex flex-col"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
              <Truck className="text-blue-600 w-8 h-8" />
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video bg-slate-200 border border-slate-200 shadow-inner">
              <motion.img 
                key={swiftshipImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={swiftshipImage} 
                alt="SwiftShip Operations" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {isSwiftshipGenerating && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold border border-white/10">
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  AI Refining...
                </div>
              )}
            </div>

            <h3 className="text-4xl font-display font-bold mb-2">SwiftShip</h3>
            <p className="text-blue-600 font-semibold mb-6">Intelligent Courier Aggregation Engine</p>
            <p className="text-slate-600 mb-8 text-lg">Ship smarter with automated courier orchestration built for India’s logistics complexity.</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "15+ courier integrations",
                "AI-powered RTO Reduction Suite",
                "Smart auto-allocation & NDR automation",
                "Branded tracking & status alerts",
                "Early COD Remittance (D+2 Days)",
                "Returns & Exchange automation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactClick}
                className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 group"
              >
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <Link 
                to="/products/swiftship"
                className="flex-grow py-4 bg-white text-black border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Learn More <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;
