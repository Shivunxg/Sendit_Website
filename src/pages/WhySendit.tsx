import { motion } from 'motion/react';
import {
  AlertTriangle,
  Boxes,
  Clock3,
  IndianRupee,
  CheckCircle2,
  Workflow,
  Warehouse,
  Truck,
  BarChart3,
  RefreshCcw,
} from 'lucide-react';

const problems = [
  {
    icon: Clock3,
    title: 'Delayed Dispatch',
    description: 'Manual handoffs between order, warehouse, and courier teams slow down daily dispatch cycles.',
  },
  {
    icon: Boxes,
    title: 'Inventory Mismatch',
    description: 'Stock appears available online but not in warehouse, leading to cancellations and poor CX.',
  },
  {
    icon: IndianRupee,
    title: 'High Shipping Cost',
    description: 'Without dynamic allocation, teams overpay for courier lanes and lose margin on every order.',
  },
  {
    icon: AlertTriangle,
    title: 'No Unified Visibility',
    description: 'Data sits in silos across tools, so operations decisions are reactive instead of proactive.',
  },
];

const solutions = [
  {
    icon: Workflow,
    title: 'Unified Workflow Engine',
    description: 'Connect order ingestion, allocation, packaging, and dispatch in one operating layer.',
  },
  {
    icon: Warehouse,
    title: 'Smart Warehouse Allocation',
    description: 'Auto-assign orders to the best warehouse based on stock, SLA, and delivery zone.',
  },
  {
    icon: Truck,
    title: 'Courier Intelligence',
    description: 'Choose optimal courier per shipment using rate, performance, and RTO behavior.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Control Tower',
    description: 'Track order health, dispatch velocity, and profitability with live analytics.',
  },
];

const flowSteps = [
  'Order Created',
  'Inventory Allocated',
  'Picked & Packed',
  'Courier Assigned',
  'Out for Delivery',
  'Delivered',
];

const dashboardImages = [
  {
    title: 'Warehouse Operations + Analytics Dashboard',
    caption: 'A combined view of warehouse activity and analytics KPIs for throughput, SLA, and dispatch health.',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Inventory & Fulfillment Pick-and-Pack',
    caption: 'Pick-and-pack operations view to monitor bin picking, packing stations, and order readiness.',
    src: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Last-Mile Delivery Tracking',
    caption: 'Shipment tracking view for route progress, delivery ETA, and final-mile status updates.',
    src: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1400',
  },
];

const WhySendit = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Why Sendit?</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Logistics teams don’t need more disconnected tools. They need one system that solves operational bottlenecks from order to delivery.
            </p>
          </motion.div>
        </div>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">Problem Statement</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">Current State</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6">
                  <Icon className="w-6 h-6 text-rose-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-display font-bold">What We’re Solving</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Future State</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {solutions.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <Icon className="w-6 h-6 text-emerald-600 mb-3" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCcw className="w-4 h-4 text-emerald-700" />
                <p className="font-bold text-emerald-800">Order-to-Delivery Lifecycle</p>
              </div>
              <div className="grid md:grid-cols-6 gap-3">
                {flowSteps.map((step, idx) => (
                  <div key={step} className="rounded-xl bg-white border border-emerald-100 p-3 text-center">
                    <p className="text-[11px] font-bold text-emerald-700 mb-1">Step {idx + 1}</p>
                    <p className="text-xs text-slate-700 font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold mb-8">Business-Relevant Logistics Views in Sendit</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {dashboardImages.map((image) => (
              <div key={image.title} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-52 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{image.title}</h3>
                  <p className="text-sm text-slate-600">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Outcome for Operations Teams</h2>
          <p className="text-slate-300 text-lg max-w-3xl mb-8">
            Better dispatch speed, lower logistics cost, cleaner inventory accuracy, and complete visibility for leadership.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold">2.3x</p>
              <p className="text-sm text-slate-300">faster dispatch decisions</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold">18%</p>
              <p className="text-sm text-slate-300">lower weighted shipping cost</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold">99%+</p>
              <p className="text-sm text-slate-300">inventory sync accuracy</p>
            </div>
          </div>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors"
          >
            Book a Problem-Solution Demo <CheckCircle2 className="w-4 h-4" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default WhySendit;
