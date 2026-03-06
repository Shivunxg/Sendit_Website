import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen">
      <section className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            Contact Sendit
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4">Let's Build Your Logistics Stack</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Tell us about your fulfillment and shipping setup. Our team will map your current flow and share a rollout plan for Sendit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Talk to our team</h2>
            <div className="space-y-5 text-slate-700">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>office@sendit.co.in</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>9972460957</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-semibold">Office</p>
                  <p>Banashankari Nilaya, No 786/289, Rajiv Gandhi Rd, JP Nagar 6th Phase, Jarganahalli, JP Nagar Phase 6, J. P. Nagar, Bengaluru, Karnataka 560078</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Prefer a guided setup session?</h2>
              <p className="text-slate-300 leading-relaxed">
                Book a demo to review your order volume, shipping zones, and warehouse operations with our onboarding specialists.
              </p>
            </div>
            <button
              onClick={onContactClick}
              className="mt-8 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-900 font-semibold px-6 py-3 rounded-xl"
            >
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
