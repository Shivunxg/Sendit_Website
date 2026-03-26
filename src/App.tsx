import { 
  Zap, 
  Menu, 
  X,
  ArrowRight,
  ChevronDown,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Products from './pages/Products';
import Solutions from './pages/Solutions';
import WhySendit from './pages/WhySendit';
import Problem from './pages/Problem';
import WareSync from './pages/WareSync';
import SwiftShip from './pages/SwiftShip';
import ShippingCalculator from './pages/ShippingCalculator';
import VolumetricCalculator from './pages/VolumetricCalculator';
import ShipmentTracking from './pages/ShipmentTracking';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import ContactModal from './components/ContactModal';
import Logo from './components/Logo';
import ChatBot from './components/ChatBot';

// --- Shared Components ---

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
    setIsToolsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Solutions', path: '/solutions' },
    { name: 'Why Sendit', path: '/why-sendit' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Track Order', path: '/track-order' }, // New top-level link
  ];

  const productLinks = [
    { name: 'WareSync (WMS)', path: '/products/waresync', desc: 'Inventory & Warehouse Management' },
    { name: 'SwiftShip', path: '/products/swiftship', desc: 'Intelligent Courier Aggregation' },
  ];

  const toolLinks = [
    { name: 'Shipping Calculator', path: '/tools/shipping-calculator', desc: 'Estimate courier rates instantly' },
    { name: 'Volumetric Calculator', path: '/tools/volumetric-calculator', desc: 'Calculate dimensional weight' },
  ];

  const closeMobileMenuWithDelay = () => {
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 300); // 300ms delay for visual confirmation
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-2 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <Logo className={`transition-all duration-500 ${isScrolled ? 'h-8' : 'h-10'} group-hover:scale-105`} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Products Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
          >
            <button 
              className={`text-sm font-semibold transition-all flex items-center gap-1.5 relative py-2 ${
                location.pathname.startsWith('/products') ? 'text-emerald-600' : 'text-slate-600 hover:text-black'
              }`}
            >
              Products 
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: location.pathname.startsWith('/products') ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </button>
            
            <AnimatePresence>
              {isProductsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-3">
                    {productLinks.map((link, idx) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className="block p-4 rounded-xl hover:bg-slate-50 transition-all group/item"
                        >
                          <p className="font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors flex items-center gap-2">
                            {link.name}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{link.desc}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shipping Tools Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsToolsDropdownOpen(true)}
            onMouseLeave={() => setIsToolsDropdownOpen(false)}
          >
            <button 
              className={`text-sm font-semibold transition-all flex items-center gap-1.5 relative py-2 ${
                location.pathname.startsWith('/tools') ? 'text-emerald-600' : 'text-slate-600 hover:text-black'
              }`}
            >
              Shipping Tools 
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: location.pathname.startsWith('/tools') ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </button>
            
            <AnimatePresence>
              {isToolsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-3">
                    {toolLinks.map((link, idx) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className="block p-4 rounded-xl hover:bg-slate-50 transition-all group/item"
                        >
                          <p className="font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors flex items-center gap-2">
                            {link.name}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{link.desc}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1, -1).map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-sm font-semibold transition-all relative py-2 group ${
                location.pathname === link.path ? 'text-emerald-600' : 'text-slate-600 hover:text-black'
              }`}
            >
              {link.name}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: location.pathname === link.path ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </Link>
          ))}

          <Link 
            to="/track-order" 
            className={`text-sm font-semibold transition-all relative py-2 group ${
              location.pathname === '/track-order' ? 'text-emerald-600' : 'text-slate-600 hover:text-black'
            }`}
          >
            Track Order
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: location.pathname === '/track-order' ? 1 : 0 }}
              whileHover={{ scaleX: 1 }}
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/login"
            className="text-sm font-bold px-4 py-2 text-slate-600 hover:text-black transition-colors"
          >
            Log In
          </Link>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            className="text-sm font-bold px-7 py-3 bg-black text-white rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-black/10"
          >
            Start Shipping
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Products</p>
              {productLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="block text-lg font-medium pl-4 border-l-2 border-slate-100" 
                  onClick={closeMobileMenuWithDelay}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shipping Tools</p>
              {toolLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="block text-lg font-medium pl-4 border-l-2 border-slate-100" 
                  onClick={closeMobileMenuWithDelay}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {navLinks.slice(1, -1).map((link) => ( // Exclude 'Track Order' for now
              <Link 
                key={link.path}
                to={link.path} 
                className="text-lg font-medium" 
                onClick={closeMobileMenuWithDelay}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/track-order" 
              className="text-lg font-medium" 
              onClick={closeMobileMenuWithDelay}
            >
              Track Order
            </Link>
            <button 
              onClick={() => { closeMobileMenuWithDelay(); onContactClick(); }}
              className="w-full py-3 bg-black text-white rounded-xl font-semibold mt-4"
            >
              Start Shipping
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg-base pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center mb-6">
              <Logo className="h-8" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              The unified logistics operating system for modern Indian brands.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: "#" },
                { icon: <Twitter className="w-4 h-4" />, href: "#" },
                { icon: <Instagram className="w-4 h-4" />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 text-slate-900">Products</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/products/waresync" className="hover:text-emerald-600 transition-colors">WareSync (WMS)</Link></li>
              <li><Link to="/products/swiftship" className="hover:text-emerald-600 transition-colors">SwiftShip (Shipping)</Link></li>
              <li><Link to="/problem" className="hover:text-emerald-600 transition-colors">The Problem</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-slate-900">Shipping Tools</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/tools/shipping-calculator" className="hover:text-emerald-600 transition-colors">Shipping Calculator</Link></li>
              <li><Link to="/tools/volumetric-calculator" className="hover:text-emerald-600 transition-colors">Volumetric Calculator</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-600 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-slate-900">Company</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/why-sendit" className="hover:text-emerald-600 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-600 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h5 className="font-bold mb-6 text-slate-900">Newsletter</h5>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Get the latest logistics insights and product updates.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-black transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2026 Sendit Logistics Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms-of-service" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

function AppContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {!isLoginPage && (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
            style={{ scaleX }}
          />
          <Navbar onContactClick={() => setIsContactOpen(true)} />
        </>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/products" element={<Products onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/products/waresync" element={<WareSync onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/products/swiftship" element={<SwiftShip onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/solutions" element={<Solutions onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/why-sendit" element={<WhySendit onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/pricing" element={<Pricing onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/tools/shipping-calculator" element={<ShippingCalculator />} />
          <Route path="/tools/volumetric-calculator" element={<VolumetricCalculator />} />
          <Route path="/track-order" element={<ShipmentTracking />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
