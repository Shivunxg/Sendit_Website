import { X, Send, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  company: string;
  email: string;
  volume: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    company: '',
    email: '',
    volume: '0 - 500 orders',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'company':
        if (!value.trim()) error = 'Company name is required';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const nameErr = validateField('name', formData.name);
    const companyErr = validateField('company', formData.company);
    const emailErr = validateField('email', formData.email);
    return !nameErr && !companyErr && !emailErr;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final validation check
    const nameErr = validateField('name', formData.name);
    const companyErr = validateField('company', formData.company);
    const emailErr = validateField('email', formData.email);
    
    if (nameErr || companyErr || emailErr) {
      setErrors({ name: nameErr, company: companyErr, email: emailErr });
      setTouched({ name: true, company: true, email: true });
      return;
    }

    setStatus('loading');

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => submitData.append(key, value));
    submitData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({
            name: '',
            company: '',
            email: '',
            volume: '0 - 500 orders',
            message: ''
          });
          setErrors({});
          setTouched({});
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg standard-card overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-brand-accent/40 hover:text-brand-dark transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold mb-2">Get Started with Sendit</h2>
              <p className="text-brand-accent/60 mb-8">Fill in the details below and our logistics experts will reach out to you within 24 hours.</p>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-brand-accent/60">Thank you for reaching out. We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-accent/80">Full Name</label>
                      <input 
                        name="name"
                        type="text" 
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-brand-secondary/5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.name && touched.name 
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-brand-secondary/10 focus:ring-brand-accent/20 focus:border-brand-accent'
                        }`}
                      />
                      {errors.name && touched.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-accent/80">Company Name</label>
                      <input 
                        name="company"
                        type="text" 
                        value={formData.company}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-brand-secondary/5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.company && touched.company 
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-brand-secondary/10 focus:ring-brand-accent/20 focus:border-brand-accent'
                        }`}
                      />
                      {errors.company && touched.company && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-accent/80">Work Email</label>
                    <input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-brand-secondary/5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.email && touched.email 
                          ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                          : 'border-brand-secondary/10 focus:ring-brand-accent/20 focus:border-brand-accent'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-accent/80">Monthly Order Volume</label>
                    <select 
                      name="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    >
                      <option>0 - 500 orders</option>
                      <option>500 - 5,000 orders</option>
                      <option>5,000 - 50,000 orders</option>
                      <option>50,000+ orders</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-accent/80">Message (Optional)</label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all resize-none"
                    />
                  </div>

                  <button 
                    disabled={status === 'loading' || !isFormValid()}
                    type="submit"
                    className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>Send Message <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="text-sm text-red-500 text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
