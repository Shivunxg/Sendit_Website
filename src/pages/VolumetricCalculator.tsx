import { Maximize, Weight, Info, ArrowRight, RefreshCw, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

const VolumetricCalculator = () => {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    height: '',
    actualWeight: '',
    divisor: '5000' // Default for most couriers in India
  });
  const [result, setResult] = useState<{
    volumetricWeight: number;
    chargeableWeight: number;
    isVolumetricHigher: boolean;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(formData.length) || 0;
    const w = parseFloat(formData.width) || 0;
    const h = parseFloat(formData.height) || 0;
    const actual = parseFloat(formData.actualWeight) || 0;
    const div = parseFloat(formData.divisor) || 5000;

    const volWeight = (l * w * h) / div;
    const chargeable = Math.max(volWeight, actual);

    setResult({
      volumetricWeight: parseFloat(volWeight.toFixed(2)),
      chargeableWeight: parseFloat(chargeable.toFixed(2)),
      isVolumetricHigher: volWeight > actual
    });
  };

  useEffect(() => {
    if (formData.length && formData.width && formData.height) {
      calculate();
    } else {
      setResult(null);
    }
  }, [formData]);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Volumetric Weight Calculator</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Understand how couriers calculate shipping costs based on package size vs. weight.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6 border border-purple-100">
              <Maximize className="w-3 h-3" /> Dimensional Weight
            </div>
            <h2 className="text-3xl font-display font-bold mb-6">Enter Package Details</h2>
            
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Length (cm)</label>
                  <input 
                    type="number" 
                    placeholder="L"
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-center text-lg font-bold"
                    value={formData.length}
                    onChange={(e) => setFormData({...formData, length: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Width (cm)</label>
                  <input 
                    type="number" 
                    placeholder="W"
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-center text-lg font-bold"
                    value={formData.width}
                    onChange={(e) => setFormData({...formData, width: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                  <input 
                    type="number" 
                    placeholder="H"
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-center text-lg font-bold"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Actual Weight (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="e.g. 2.5"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-lg font-bold"
                    value={formData.actualWeight}
                    onChange={(e) => setFormData({...formData, actualWeight: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Courier Divisor</label>
                <select 
                  className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold"
                  value={formData.divisor}
                  onChange={(e) => setFormData({...formData, divisor: e.target.value})}
                >
                  <option value="5000">Standard (5000) - Most Couriers</option>
                  <option value="4500">Express (4500) - Some Air Cargo</option>
                  <option value="6000">Economy (6000) - Surface/Large Items</option>
                </select>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                  <Info className="w-3 h-3" /> Most Indian couriers use 5000 as the standard divisor.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold mb-8">Calculation Result</h3>
                    
                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Volumetric Weight</p>
                        <p className="text-4xl font-bold">{result.volumetricWeight} <span className="text-lg font-normal text-slate-400">kg</span></p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Actual Weight</p>
                        <p className="text-4xl font-bold">{formData.actualWeight || 0} <span className="text-lg font-normal text-slate-400">kg</span></p>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl mb-8">
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Final Chargeable Weight</p>
                      <p className="text-5xl font-bold text-purple-400">{result.chargeableWeight} <span className="text-xl font-normal text-white/50">kg</span></p>
                      <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                        {result.isVolumetricHigher 
                          ? "Your package is light but bulky. Couriers will charge based on the space it occupies (Volumetric Weight)."
                          : "Your package is dense. Couriers will charge based on its actual physical weight."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium text-purple-300">
                      <Box className="w-5 h-5" />
                      Formula: (L × W × H) / {formData.divisor}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Maximize className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Awaiting Dimensions</h3>
                  <p className="text-slate-400 text-sm max-w-[250px]">Enter the length, width, and height of your package to see the volumetric calculation.</p>
                </div>
              )}
            </AnimatePresence>

            <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Why does this matter?
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Shipping companies use the greater of the actual weight or volumetric weight to calculate shipping costs. This is because large, light packages take up more space in a truck or aircraft than small, heavy ones.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-4xl font-display font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[ 
              { q: "How is volumetric weight calculated?", a: "Volumetric weight is calculated using the formula: (Length x Width x Height) / Divisor. The divisor is a factor set by courier companies, typically 5000 or 6000 for road shipments." },
              { q: "What are common courier divisors?", a: "In India, 5000 is the most common divisor for volumetric weight calculation across most major couriers. Some specialized or international services might use 4500 or 6000." },
              { q: "Why do couriers use volumetric weight?", a: "Couriers charge based on volumetric weight to account for the space a package occupies in their vehicles. If a package is very light but large, it takes up more space than its actual weight would suggest, so they charge based on the 'dimensional weight'." },
              { q: "What factors influence shipping rates?", a: "Shipping rates are primarily influenced by origin and destination pincodes, package weight (actual or volumetric, whichever is higher), dimensions, chosen courier partner, and service type (e.g., express, standard)." }
            ].map((faq, i) => (
              <div key={i}>
                <h4 className="text-lg font-bold mb-3">{faq.q}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumetricCalculator;
