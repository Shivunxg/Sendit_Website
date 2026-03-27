import { Calculator, MapPin, Weight, RefreshCw, ArrowRight, Truck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

const ShippingCalculatorPage = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });
  const [results, setResults] = useState<any[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const weight = parseFloat(formData.weight) || 0.5;
      const volWeight = (parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height)) / 5000 || 0;
      const chargeableWeight = Math.max(weight, volWeight);
      
      const mockCouriers = [
        { name: 'BlueDart', rate: 85, time: '1-2 Days', type: 'Express' },
        { name: 'Delhivery', rate: 65, time: '2-4 Days', type: 'Standard' },
        { name: 'Ecom Express', rate: 55, time: '3-5 Days', type: 'Economy' },
        { name: 'Amazon Shipping', rate: 72, time: '2-3 Days', type: 'Premium' }
      ];

      const calculatedResults = mockCouriers.map(c => ({
        ...c,
        total: Math.round(c.rate * chargeableWeight + 20) // Base rate * weight + fixed fee
      }));

      setResults(calculatedResults);
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 premium-hero min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Shipping Rate Calculator</h1>
            <p className="text-xl text-brand-accent/60 max-w-2xl mx-auto">
              Compare shipping rates across India's top courier partners in seconds.
            </p>
          </motion.div>
        </div>

        <div className="standard-card p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6 border border-brand-primary/20">
                <Calculator className="w-3 h-3" /> Rate Estimator
              </div>
              <h2 className="text-3xl font-display font-bold mb-6">Calculate Your Shipment</h2>
              <p className="text-brand-accent/60 mb-10 leading-relaxed">
                Input your shipment details to see real-time cost comparisons. We calculate both dead weight and volumetric weight to give you the most accurate estimate.
              </p>

              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest ml-1">Origin Pincode</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-accent/40" />
                      <input 
                        type="text" 
                        placeholder="e.g. 110001"
                        required
                        className="w-full pl-11 pr-4 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        value={formData.origin}
                        onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest ml-1">Destination Pincode</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-accent/40" />
                      <input 
                        type="text" 
                        placeholder="e.g. 400001"
                        required
                        className="w-full pl-11 pr-4 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest ml-1">Weight (kg)</label>
                    <div className="relative">
                      <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-accent/40" />
                      <input 
                        type="number" 
                        step="0.1"
                        placeholder="e.g. 0.5"
                        required
                        className="w-full pl-11 pr-4 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest ml-1">Dimensions (L x W x H cm)</label>
                    <div className="relative flex gap-2">
                      <input 
                        type="number" 
                        placeholder="L"
                        className="w-full px-3 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-center"
                        value={formData.length}
                        onChange={(e) => setFormData({...formData, length: e.target.value})}
                      />
                      <input 
                        type="number" 
                        placeholder="W"
                        className="w-full px-3 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-center"
                        value={formData.width}
                        onChange={(e) => setFormData({...formData, width: e.target.value})}
                      />
                      <input 
                        type="number" 
                        placeholder="H"
                        className="w-full px-3 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-center"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" /> Calculating...
                    </>
                  ) : (
                    <>
                      Calculate Rates <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {!results && !isCalculating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-brand-secondary/10 rounded-3xl"
                  >
                    <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mb-4">
                      <Truck className="w-8 h-8 text-brand-accent/40" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-accent/40">Ready to Calculate</h4>
                    <p className="text-brand-accent/40 text-sm max-w-[200px]">Enter shipment details to see courier options and rates.</p>
                  </motion.div>
                )}

                {isCalculating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
                      <Truck className="absolute inset-0 m-auto w-8 h-8 text-brand-primary" />
                    </div>
                    <p className="mt-6 font-bold text-brand-dark">Fetching best rates...</p>
                    <p className="text-brand-accent/40 text-sm">Comparing 15+ courier partners</p>
                  </motion.div>
                )}

                {results && !isCalculating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      Estimated Rates <span className="text-xs font-normal text-brand-accent/40">(Inclusive of all taxes)</span>
                    </h4>
                    {results.map((res, i) => (
                      <div key={i} className="p-5 bg-white rounded-2xl border border-brand-secondary/10 flex items-center justify-between hover:shadow-lg transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-secondary/5 rounded-xl flex items-center justify-center font-bold text-[10px] text-brand-secondary/80 text-center leading-tight">
                            {res.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-brand-dark">{res.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-brand-accent/70 flex items-center gap-1">
                                <Activity className="w-3 h-3" /> {res.time}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-brand-primary/10 text-brand-primary rounded">
                                {res.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-brand-dark">₹{res.total}</p>
                          <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Best Value</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-[10px] text-brand-accent/40 text-center pt-4 italic">
                      *Rates are indicative and subject to change based on actual weight and dimensions at pickup.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ShippingCalculatorPage;
