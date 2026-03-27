import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle2, XCircle, RefreshCw, ArrowRight } from 'lucide-react';

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
}

interface TrackingResult {
  trackingNumber: string;
  courier: string;
  status: string;
  eta: string;
  events: TrackingEvent[];
}

const ShipmentTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTrackingResult(null);

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number.');
      setIsLoading(false);
      return;
    }

    // Simulate API call for tracking
    setTimeout(() => {
      if (trackingNumber === '123456789' || trackingNumber === 'SENDIT123') {
        setTrackingResult({
          trackingNumber: trackingNumber,
          courier: 'SwiftShip Express',
          status: 'In Transit',
          eta: '2026-03-01',
          events: [
            { status: 'Out for Delivery', location: 'Mumbai Hub', timestamp: '2026-02-26 10:00 AM' },
            { status: 'Arrived at Destination Hub', location: 'Mumbai Hub', timestamp: '2026-02-26 08:00 AM' },
            { status: 'Departed from Origin Hub', location: 'Delhi Hub', timestamp: '2026-02-25 06:00 PM' },
            { status: 'Package Picked Up', location: 'Delhi', timestamp: '2026-02-25 02:00 PM' },
            { status: 'Order Placed', location: 'Online', timestamp: '2026-02-25 10:00 AM' },
          ],
        });
      } else if (trackingNumber === 'DELIVERED123') {
        setTrackingResult({
          trackingNumber: trackingNumber,
          courier: 'SwiftShip Express',
          status: 'Delivered',
          eta: '2026-02-25',
          events: [
            { status: 'Delivered', location: 'Customer Address', timestamp: '2026-02-25 03:30 PM' },
            { status: 'Out for Delivery', location: 'Local Hub', timestamp: '2026-02-25 10:00 AM' },
            { status: 'Arrived at Destination Hub', location: 'Local Hub', timestamp: '2026-02-25 08:00 AM' },
          ],
        });
      } else {
        setError('Tracking number not found. Please check and try again.');
      }
      setIsLoading(false);
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
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-brand-dark">Track Your Shipment</h1>
            <p className="text-xl text-brand-secondary max-w-2xl mx-auto">
              Enter your tracking number to get real-time updates on your package status and location.
            </p>
          </motion.div>
        </div>

        <div className="standard-card p-8 md:p-12 mb-16">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative w-full sm:w-2/3 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-accent/40" />
              <input
                type="text"
                placeholder="Enter tracking number (e.g., 123456789)"
                className="w-full pl-12 pr-4 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-lg"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Tracking...
                </>
              ) : (
                <>
                  Track Package <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-red-600 text-center mt-4 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {trackingResult && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="standard-card p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest mb-2">Tracking Number</p>
                  <p className="text-2xl font-bold text-brand-dark">{trackingResult.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest mb-2">Courier Partner</p>
                  <p className="text-2xl font-bold text-brand-dark">{trackingResult.courier}</p>
                </div>
              </div>

              <div className="mb-10 p-6 bg-brand-secondary/5 rounded-2xl border border-brand-secondary/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest mb-2">Current Status</p>
                  <div className="flex items-center gap-3">
                    {trackingResult.status === 'Delivered' ? (
                      <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                    ) : trackingResult.status === 'In Transit' ? (
                      <Package className="w-6 h-6 text-brand-primary" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <p className="text-3xl font-bold text-brand-dark">{trackingResult.status}</p>
                  </div>
                </div>
                {trackingResult.eta && (
                  <div className="text-right">
                    <p className="text-xs font-bold text-brand-accent/70 uppercase tracking-widest mb-2">Estimated Delivery</p>
                    <p className="text-xl font-bold text-brand-dark">{trackingResult.eta}</p>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-brand-dark mb-8">Tracking History</h3>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-brand-secondary/10" />

                <div className="space-y-8">
                  {trackingResult.events.map((event, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative flex items-start gap-6 pl-10 ${i === 0 ? 'group' : ''}`}
                    >
                      {/* Event Indicator */}
                      <div className="absolute left-0 top-1.5 flex items-center justify-center">
                        {i === 0 ? (
                          <div className="relative">
                            <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-25" />
                            <div className="relative w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center border-4 border-white">>
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-brand-secondary/10">
                            <div className="w-2 h-2 bg-brand-secondary/20 rounded-full" />
                          </div>
                        )}
                      </div>

                      {/* Event Content */}
                      <div className={`flex-grow p-5 rounded-2xl transition-all ${
                        i === 0 
                          ? 'bg-brand-primary/5 border border-brand-primary/10' 
                          : 'hover:bg-brand-secondary/5 border border-transparent'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <p className={`font-bold text-lg ${i === 0 ? 'text-brand-primary' : 'text-brand-dark'}`}>
                            {event.status}
                          </p>
                          <p className="text-brand-secondary text-xs font-medium flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {event.timestamp}
                          </p>
                        </div>
                        <p className={`text-sm flex items-center gap-2 ${i === 0 ? 'text-brand-primary/80' : 'text-brand-secondary'}`}>
                          <MapPin className={`w-4 h-4 ${i === 0 ? 'text-brand-primary' : 'text-brand-accent/70'}`} /> 
                          {event.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!trackingResult && !isLoading && !error && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-brand-secondary/10 rounded-3xl"
            >
              <Package className="w-12 h-12 text-brand-accent/20 mb-4" />
              <p className="text-lg font-bold text-brand-accent/40">Enter a tracking number above</p>
              <p className="text-brand-accent/40 text-sm max-w-[250px]">We support major courier partners across India.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShipmentTracking;
