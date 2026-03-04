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
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Track Your Shipment</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Enter your tracking number to get real-time updates on your package status and location.
            </p>
          </motion.div>
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8 md:p-12 mb-16">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative w-full sm:w-2/3 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter tracking number (e.g., 123456789)"
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
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
              className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tracking Number</p>
                  <p className="text-2xl font-bold text-slate-900">{trackingResult.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Courier Partner</p>
                  <p className="text-2xl font-bold text-slate-900">{trackingResult.courier}</p>
                </div>
              </div>

              <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Status</p>
                  <div className="flex items-center gap-3">
                    {trackingResult.status === 'Delivered' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : trackingResult.status === 'In Transit' ? (
                      <Package className="w-6 h-6 text-blue-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <p className="text-3xl font-bold text-slate-900">{trackingResult.status}</p>
                  </div>
                </div>
                {trackingResult.eta && (
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Delivery</p>
                    <p className="text-xl font-bold text-slate-700">{trackingResult.eta}</p>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-6">Tracking History</h3>
              <div className="space-y-6">
                {trackingResult.events.map((event, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-slate-300'} shrink-0`} />
                      {i < trackingResult.events.length - 1 && (
                        <div className="w-0.5 h-10 bg-slate-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{event.status}</p>
                      <p className="text-slate-600 text-sm flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-slate-400" /> {event.location}
                      </p>
                      <p className="text-slate-500 text-xs flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {event.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {!trackingResult && !isLoading && !error && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl"
            >
              <Package className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-lg font-bold text-slate-400">Enter a tracking number above</p>
              <p className="text-slate-400 text-sm max-w-[250px]">We support major courier partners across India.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShipmentTracking;
