import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 premium-hero">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1]">
              Let's Talk <br />
              <span className="text-brand-primary">Logistics.</span>
            </h1>
            <p className="text-xl text-brand-accent/60 mb-12 leading-relaxed max-w-xl">
              Have questions about our WMS or Shipping solutions? Our team of experts is ready to help you optimize your supply chain.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-brand-accent/60 mb-1">For general inquiries & support:</p>
                  <a href="mailto:hello@sendit.co.in" className="text-brand-primary font-bold hover:underline">hello@sendit.co.in</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-brand-accent/60 mb-1">Mon-Sat, 9am - 7pm IST:</p>
                  <a href="tel:+918045678901" className="text-brand-accent font-bold hover:underline">+91 80 4567 8901</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Registered Office</h4>
                  <p className="text-brand-accent/60 leading-relaxed">
                    <strong>Sendit Logistics Pvt Ltd</strong><br />
                    NO.786/289, Rajiv Gandhi Rd,<br />
                    JP Nagar 6th Phase, Bengaluru,<br />
                    Karnataka 560078, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="standard-card p-8 md:p-12 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold">Send a Message</h3>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-accent/80 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-accent/80 uppercase tracking-wider">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-accent/80 uppercase tracking-wider">Subject</label>
                <select className="w-full px-5 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all">
                  <option>General Inquiry</option>
                  <option>Sales & Demo Request</option>
                  <option>Technical Support</option>
                  <option>Partnership Opportunity</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-accent/80 uppercase tracking-wider">Message</label>
                <textarea 
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 bg-white border border-brand-secondary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all resize-none"
                />
              </div>

              <button className="w-full py-5 bg-brand-dark text-white rounded-2xl font-bold text-lg hover:bg-brand-secondary transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 group">
                Submit Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
