import { X, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const Problem = () => {
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200");
  const [isGenerating, setIsGenerating] = useState(false);

  const problems = [
    "What inventory is running low",
    "Which warehouse is underperforming",
    "Why shipping costs are rising",
    "Where margins are leaking",
    "How operations impact profitability"
  ];

  useEffect(() => {
    const generateImage = async () => {
      setIsGenerating(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
        const prompt = `A modern SaaS-style hero image for a logistics technology startup. 
Scene: A dark, futuristic logistics control tower environment with a large digital dashboard screen showing real-time supply chain analytics. The dashboard should include:
- Inventory levels with low-stock alerts
- Warehouse performance metrics
- Shipping cost trends rising on a graph
- Margin analysis or profitability indicators
- Operational KPI panels (SLA %, order volume, cost per shipment)

Style:
- Dark navy blue background with subtle gradient
- Clean minimal UI (no clutter)
- Blue and cyan data highlights
- Soft glow around dashboard elements
- No people
- No text overlays
- High resolution
- Cinematic lighting
- Modern, premium SaaS aesthetic (similar to Stripe, Palantir, Flexport)
- Slight depth of field blur for realism

Mood:
Data-driven, intelligent, operational control, high-tech, enterprise-ready.`;

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
        console.error("Error generating image:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateImage();
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
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">The Logistics Gap</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most platforms only solve half the problem. We solve the part that actually impacts your margins.
            </p>
          </motion.div>
        </div>



        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">What this page shows</p>
            <p className="text-sm font-semibold text-slate-800">Core logistics gaps that hurt delivery speed and customer experience.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Operational blind spots</p>
            <p className="text-sm font-semibold text-slate-800">Inventory, warehouse performance, shipping cost, and profitability visibility issues.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Why Sendit exists</p>
            <p className="text-sm font-semibold text-slate-800">How a unified lifecycle platform solves the disconnect between tools.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Shipping Aggregators Are <span className="text-slate-400">Not Enough.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Generating labels is easy. Managing the operational complexity behind those labels is where most brands fail. Without unified data, you're flying blind.
            </p>
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-slate-700 font-medium text-lg">{problem}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-xl text-slate-900 font-semibold">
                Disconnected systems create operational chaos. <br />
                <span className="text-emerald-600">Sendit was built to unify the entire lifecycle.</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center relative">
              <motion.img 
                key={heroImage}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={heroImage} 
                alt="Operational Control Tower" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {isGenerating && (
                <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold border border-white/20">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  AI Optimizing...
                </div>
              )}
            </div>
            <div className="absolute -bottom-8 -right-8 w-72 p-8 bg-black text-white rounded-3xl shadow-2xl">
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
