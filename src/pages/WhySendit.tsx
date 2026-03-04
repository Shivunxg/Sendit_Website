import { motion } from 'motion/react';
import { Layers, Zap, Lock, Globe, ShieldCheck, Activity, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const WhySendit = ({ onContactClick }: { onContactClick: () => void }) => {
  const [visualImage, setVisualImage] = useState<string>("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const generateVisual = async () => {
      setIsGenerating(true);
      try {
        const prompt = `Create a realistic modern SaaS website section visual representing scalable warehouse management and enterprise-grade security. Style inspiration: Stripe, Palantir, AWS enterprise visuals. Use dark navy gradient background with subtle glow accents.

Scene: A split visual composition.
Left side: A modern, organized fulfillment warehouse with multiple storage racks, workers using handheld barcode scanners, conveyor belts moving parcels, and structured inventory bins. The environment should feel efficient, scalable, and well-managed.
Right side: A subtle overlay of a secure cloud infrastructure concept — data center racks or a secure digital dashboard with security shield icons, uptime metrics, and system monitoring panels (no readable text). The security visuals should feel integrated and realistic, not futuristic or holographic.

Style: Professional commercial photography, Clean lighting, Modern enterprise SaaS aesthetic, Dark blue and neutral color tones, Subtle depth of field, No logos, No readable text, No exaggerated neon effects, No stock-photo posing.
Mood: Scalable operations, Enterprise reliability, Security by design, High-performance logistics technology.`;

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
            setVisualImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating visual image:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateVisual();
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
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Why Choose Sendit?</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We don't just generate labels. We power the entire fulfillment lifecycle with intelligence and scale.
            </p>
            <p className="text-slate-500 mt-4">
              <Link to="/problem" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-center gap-2">
                Understand the Core Problem <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Differentiation Table */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">The Sendit Advantage</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-8 px-8 text-left text-slate-400 font-medium uppercase tracking-wider text-sm">Feature</th>
                  <th className="py-8 px-8 text-left text-slate-400 font-medium uppercase tracking-wider text-sm">Typical Aggregator</th>
                  <th className="py-8 px-8 text-left text-black font-bold uppercase tracking-wider text-sm bg-emerald-50 rounded-t-3xl">Sendit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Core Offering", "Only courier rate comparison", "Shipping + Inventory + Warehouse"],
                  ["Visibility", "No inventory visibility", "Real-time stock intelligence"],
                  ["Execution", "No warehouse execution layer", "Full WMS workflows"],
                  ["Analytics", "Limited cost visibility", "Shipment profitability analytics"],
                  ["Integration", "Easy to switch", "Deep operational integration"],
                  ["Scalability", "Single warehouse focus", "Multi-warehouse architecture"]
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-8 px-8 font-semibold text-slate-900 text-lg">{row[0]}</td>
                    <td className="py-8 px-8 text-slate-500 text-lg">{row[1]}</td>
                    <td className="py-8 px-8 font-bold text-emerald-700 bg-emerald-50 text-lg">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 relative rounded-[3rem] overflow-hidden aspect-[21/9] bg-slate-900 shadow-2xl border border-white/5"
        >
          <img 
            src={visualImage} 
            alt="Enterprise Scale and Security" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Enterprise-Grade Infrastructure</h3>
              <p className="text-lg text-slate-300">
                Sendit is built on a high-performance cloud architecture designed to handle the massive scale of Indian e-commerce with zero compromise on security.
              </p>
            </div>
          </div>
          {isGenerating && (
            <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold border border-white/10">
              <Loader2 className="w-3 h-3 animate-spin" />
              AI Refining Visual...
            </div>
          )}
        </motion.div>

        {/* Scalability & Security */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="p-12 bg-slate-50 rounded-3xl border border-slate-200">
            <h2 className="text-4xl font-display font-bold mb-8">Built for Scale</h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Whether you ship 100 orders per month or 100,000, Sendit scales with you. Our architecture is designed for high-velocity Indian logistics.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Layers />, title: "Multi-warehouse", desc: "Manage stock across multiple locations seamlessly." },
                { icon: <Zap />, title: "API-First", desc: "Integrate with any ERP, POS, or custom storefront." },
                { icon: <Globe />, title: "Pan-India", desc: "Optimized for Tier 1 to Tier 4 delivery complexity." },
                { icon: <TrendingUp />, title: "Intelligence", desc: "Automated routing based on real-time SLA data." }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-emerald-600 mb-4">{item.icon}</div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12 bg-emerald-50 rounded-3xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-display font-bold mb-8 text-slate-900">Enterprise Security</h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Your operational data is your most valuable asset. We protect it with enterprise-grade security protocols and redundant infrastructure.
              </p>
              <ul className="space-y-6">
                {[
                  "Secure cloud architecture with 99.9% uptime",
                  "Role-based access control (RBAC)",
                  "Real-time system monitoring & audit logs",
                  "Reliable, scalable performance under peak loads"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <ShieldCheck className="text-emerald-600 w-6 h-6 shrink-0" />
                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySendit;
