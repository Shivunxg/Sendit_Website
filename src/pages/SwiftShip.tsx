import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Search, 
  Bell, 
  RotateCcw, 
  AlertCircle,
  Smartphone,
  MessageSquare,
  Clock,
  ArrowDown,
  Loader2,
  X
} from 'lucide-react';

import SwiftShipVisual from '../components/SwiftShipVisual';
import BrandedTrackingVisual from '../components/BrandedTrackingVisual';

const SwiftShip = ({ onContactClick }: { onContactClick: () => void }) => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Static images are now used, no AI generation needed.
  }, []);
  const shippingFeatures = [
    {
      title: "Shipping Intelligence",
      desc: "AI-driven courier selection based on 50+ parameters including cost, speed, and NDR performance. Optimize every shipment for maximum delivery success.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-brand-primary/10 text-brand-primary",
      stats: [
        { label: "Couriers", value: "15+" },
        { label: "Optimization", value: "AI-Led" }
      ]
    },
    {
      title: "RTO Reduction Suite",
      desc: "Predictive AI to flag high-risk orders. Automate COD verification via WhatsApp and IVR to reduce RTO by up to 45%.",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "bg-brand-primary/10 text-brand-primary",
      stats: [
        { label: "RTO Drop", value: "-45%" },
        { label: "Verification", value: "Auto" }
      ]
    },
    {
      title: "Automated NDR Management",
      desc: "Real-time non-delivery follow-ups via WhatsApp, SMS, and Email. Empower buyers to re-schedule or update addresses instantly.",
      icon: <Activity className="w-6 h-6" />,
      color: "bg-brand-accent/10 text-brand-accent",
      stats: [
        { label: "Resolution", value: "90%" },
        { label: "Response", value: "< 5m" }
      ]
    },
    {
      title: "Branded Tracking Experience",
      desc: "Custom tracking pages on your domain. Drive 15% more repeat sales with product recommendations and NPS surveys on the tracking page.",
      icon: <Search className="w-6 h-6" />,
      color: "bg-brand-primary/10 text-brand-primary",
      stats: [
        { label: "Repeat Sales", value: "+15%" },
        { label: "NPS Score", value: "4.9/5" }
      ]
    }
  ];

  const postPurchaseFeatures = [
    {
      title: "Returns & Exchange Automation",
      desc: "Self-service returns portal for your buyers. Automate exchange approvals, reverse pickups, and instant refunds to build trust.",
      icon: <RotateCcw className="w-5 h-5" />
    },
    {
      title: "Real-time Status Updates",
      desc: "Proactive multi-channel alerts (WhatsApp, Email, SMS) for every delivery milestone. Reduce customer anxiety and support tickets.",
      icon: <Bell className="w-5 h-5" />
    },
    {
      title: "Early COD Remittance",
      desc: "Improve cash flow with early COD remittances as fast as D+2 days. Don't let your capital get stuck with courier partners.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "COD Order Verification",
      desc: "Automate WhatsApp and IVR confirmation for COD orders. Verify intent and address accuracy before shipping to prevent RTO.",
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-32 pb-24 premium-hero selection:bg-brand-primary/10 selection:text-brand-dark">
      <Helmet>
        <title>SwiftShip | AI-Driven Courier Selection & Shipping Optimization</title>
        <meta name="description" content="Optimize every shipment with AI-driven courier selection, real-time tracking, and automated RTO reduction. Built for high-growth Indian D2C brands." />
        <link rel="canonical" href="https://sendit.in/swiftship" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6 border border-brand-primary/20">
              <Globe className="w-3 h-3" /> 29,000+ Pincodes Covered
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1]">
              Seamless Shipping, <br />
              <span className="text-brand-primary">Everywhere.</span>
            </h1>
            <p className="text-xl text-brand-dark/70 mb-10 leading-relaxed max-w-xl">
              SwiftShip is India's best e-commerce shipping solution, combining courier aggregation with AI-powered RTO reduction and returns automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onContactClick}
                className="px-10 py-5 bg-brand-dark text-white rounded-full font-bold text-xl hover:bg-brand-dark/90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/10"
              >
                Start Shipping <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/tools/shipping-calculator')}
                className="px-10 py-5 bg-white text-brand-dark border border-brand-secondary/10 rounded-full font-bold text-xl hover:bg-bg-alt transition-all"
              >
                Calculate Rates
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative standard-card p-4 shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <SwiftShipVisual />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Shipping Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {shippingFeatures.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 standard-card hover:border-brand-primary/50 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-brand-dark/70 text-lg leading-relaxed mb-8">{feature.desc}</p>
              
              {/* Animated Stats Data */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {feature.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-brand-secondary/10 shadow-sm">
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

              <button 
                onClick={() => setSelectedFeature(i)}
                className="flex items-center gap-2 font-bold text-brand-dark hover:gap-3 transition-all"
              >
                Explore Feature <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Feature Elaboration Modal */}
        <AnimatePresence>
          {selectedFeature !== null && (
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
                onClick={() => setSelectedFeature(null)}
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-brand-secondary/10 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${shippingFeatures[selectedFeature].color} flex items-center justify-center`}>
                      {shippingFeatures[selectedFeature].icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{shippingFeatures[selectedFeature].title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedFeature(null)}
                    className="p-2 hover:bg-brand-secondary/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-grow overflow-y-auto p-8 md:p-12">
                  {selectedFeature === 0 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">The Brain Behind <br /><span className="text-brand-primary">Every Shipment</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Our Shipping Intelligence engine doesn't just pick a courier; it orchestrates the perfect delivery path. By analyzing millions of data points in real-time, we ensure your orders reach customers faster and cheaper.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "Dynamic courier allocation based on real-time SLA",
                              "Cost-optimization engine for zone-wise savings",
                              "Weight-discrepancy prevention logic",
                              "Serviceability check for 29,000+ pincodes",
                              "Historical performance-based routing"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-primary w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-brand-secondary/5 rounded-3xl p-8 border border-brand-secondary/10">
                          <div className="space-y-6">
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">Avg. Shipping Cost</p>
                                <p className="text-3xl font-bold text-brand-primary">-18%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">Delivery Speed</p>
                                <p className="text-3xl font-bold text-brand-accent">+24%</p>
                              </div>
                            </div>
                            <div className="h-40 bg-white rounded-2xl border border-brand-secondary/10 p-4 flex items-end gap-2">
                              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  className="flex-grow bg-brand-primary/20 rounded-t-md border-t-2 border-brand-primary"
                                />
                              ))}
                            </div>
                            <p className="text-xs text-center text-brand-accent font-medium italic">Real-time cost optimization across 15+ courier partners</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedFeature === 1 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">AI-Powered <br /><span className="text-brand-primary">RTO Reduction</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Identify and prevent Return-to-Origin (RTO) before it happens. Our AI engine analyzes historical buyer behavior, address quality, and intent to score every order.
                          </p>
                          <div className="space-y-4 mb-8">
                            {[
                              "Real-time risk scoring (High/Medium/Low)",
                              "Automated WhatsApp COD confirmation",
                              "Address quality check & correction",
                              "Buyer history & blacklisting"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-primary w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden border border-brand-secondary/10 shadow-xl bg-white p-6">
                          <h5 className="text-sm font-bold mb-4 text-brand-accent uppercase tracking-widest">Risk Analysis Engine</h5>
                          <div className="space-y-3">
                            {[
                              { level: "High Risk", color: "bg-brand-primary", action: "Hold" },
                              { level: "Medium Risk", color: "bg-brand-secondary", action: "Verify" },
                              { level: "Low Risk", color: "bg-brand-accent", action: "Ship" }
                            ].map((risk, i) => (
                              <div key={i} className="p-3 rounded-xl border border-brand-secondary/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${risk.color}`} />
                                  <span className="font-bold text-sm">{risk.level}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-secondary/10 rounded">{risk.action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-8 bg-brand-secondary/5 rounded-3xl border border-brand-secondary/10">
                        <h5 className="font-bold mb-4">How it works:</h5>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <div className="text-brand-primary font-bold">01. Scoring</div>
                            <p className="text-xs text-brand-accent">AI analyzes 50+ parameters including past delivery success and address accuracy.</p>
                          </div>
                          <div className="space-y-2">
                            <div className="text-brand-primary font-bold">02. Verification</div>
                            <p className="text-xs text-brand-accent">High-risk orders trigger automated WhatsApp/IVR confirmation flows.</p>
                          </div>
                          <div className="space-y-2">
                            <div className="text-brand-primary font-bold">03. Prevention</div>
                            <p className="text-xs text-brand-accent">Unverified or fraudulent orders are flagged for cancellation, saving forward logistics costs.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedFeature === 2 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Automated <br /><span className="text-brand-accent">NDR Management</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            NDR (Non-Delivery Report) is the #1 cause of RTO. SwiftShip detects failed attempts in real-time and triggers intelligent multi-channel workflows to resolve them.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "Instant WhatsApp/SMS triggers for failed attempts",
                              "Self-service portal for buyers to update details",
                              "AI-driven re-attempt scheduling",
                              "Real-time feedback loop to courier agents",
                              "Intelligence dashboard for high-NDR zones"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-accent w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-brand-dark rounded-3xl p-8 text-white">
                          <div className="flex items-center gap-3 mb-6">
                            <Activity className="text-brand-accent w-5 h-5" />
                            <span className="font-bold text-sm uppercase tracking-widest">Live NDR Stream</span>
                          </div>
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                              <p className="text-xs text-brand-accent mb-1">Reason: Customer Not Available</p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold">BlueDart #8274</span>
                                <span className="text-[10px] font-bold text-brand-accent">Resolving...</span>
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <ArrowDown className="w-4 h-4 text-brand-secondary animate-bounce" />
                            </div>
                            <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20">
                              <p className="text-xs text-brand-accent mb-1">Action: WhatsApp Sent</p>
                              <p className="text-sm font-bold">Buyer Rescheduled: Tomorrow 2PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedFeature === 3 && (
                    <div className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h4 className="text-3xl font-display font-bold mb-6">Branded <br /><span className="text-brand-primary">Tracking Experience</span></h4>
                          <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                            Don't send your customers to a third-party courier website. Keep them engaged with your brand on a custom tracking page hosted on your domain.
                          </p>
                          <ul className="space-y-4">
                            {[
                              "White-labeled tracking pages on your domain",
                              "AI-driven product recommendations",
                              "Real-time milestone updates via WhatsApp",
                              "Integrated NPS & feedback collection",
                              "Marketing banners & promotional widgets"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-primary w-5 h-5 shrink-0" />
                                <span className="text-brand-dark font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden border border-brand-secondary/10 shadow-2xl aspect-square">
                          <BrandedTrackingVisual />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2">Live Preview</p>
                            <p className="text-xl font-bold">Your Brand. Your Experience.</p>
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
                      setSelectedFeature(null);
                      onContactClick();
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/25 flex items-center justify-center gap-2 group"
                  >
                    Book a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Feature Elaborations - Removed as they are now in the modal */}

        {/* Post-Purchase Suite */}
        <div className="bg-brand-primary rounded-[3.5rem] p-12 md:p-24 text-white overflow-hidden relative mb-32">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Top-notch <br />
                <span className="text-brand-accent">Customer Experience.</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Go above and beyond for your customers. SwiftShip transforms ordinary deliveries into lifelong brand connections.
              </p>
              <div className="space-y-8">
                {postPurchaseFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-white">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                      <p className="text-white/80 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-8 bg-white/10 border border-white/20 rounded-[2.5rem] backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-6">The RTO Reduction Tool Every Brand Needs</h3>
                <ul className="space-y-6">
                  {[
                    "AI-Based Fraud Detection (Risk Scoring)",
                    "Automated WhatsApp COD Verification",
                    "Real-time Address Correction Workflows",
                    "Proactive NDR Tele-calling & WhatsApp",
                    "Early COD Remittance (D+2 Days)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="text-brand-accent w-6 h-6 shrink-0" />
                      <span className="text-lg text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onContactClick}
                  className="w-full mt-10 py-5 bg-white text-brand-primary rounded-2xl font-bold text-xl hover:bg-bg-alt transition-all shadow-xl shadow-brand-primary/20"
                >
                  Activate RTO Suite Now
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Final CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Ship Effortlessly?</h2>
          <p className="text-xl text-brand-dark/70 mb-10">
            Join thousands of D2C brands that have reduced their shipping costs and RTOs with SwiftShip.
          </p>
          <button 
            onClick={onContactClick}
            className="px-12 py-5 bg-brand-dark text-white rounded-full font-bold text-xl hover:bg-brand-dark/90 transition-all shadow-2xl"
          >
            Start Shipping Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwiftShip;
