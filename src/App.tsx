import { 
  Zap, 
  Menu, 
  X,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
import ContactModal from './components/ContactModal';
import Logo from './components/Logo';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Products Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
          >
            <button 
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${location.pathname.startsWith('/products') ? 'text-emerald-600' : 'text-slate-600 hover:text-black'}`}
            >
              Products <ChevronDown className={`w-4 h-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isProductsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-2">
                    {productLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{link.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{link.desc}</p>
                      </Link>
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
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${location.pathname.startsWith('/tools') ? 'text-emerald-600' : 'text-slate-600 hover:text-black'}`}
            >
              Shipping Tools <ChevronDown className={`w-4 h-4 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isToolsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-2">
                    {toolLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{link.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{link.desc}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1, -1).map((link) => ( // Exclude 'Track Order' for now, will add separately
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-emerald-600' : 'text-slate-600 hover:text-black'}`}
            >
              {link.name}
            </Link>
          ))}

          <Link 
            to="/track-order" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/track-order' ? 'text-emerald-600' : 'text-slate-600 hover:text-black'}`}
          >
            Track Order
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/login"
            className="text-sm font-semibold px-4 py-2 text-slate-600 hover:text-black transition-colors"
          >
            Log In
          </Link>
          <button 
            onClick={onContactClick}
            className="text-sm font-semibold px-6 py-2.5 bg-black text-white rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
          >
            Start Shipping
          </button>
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
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <Logo className="h-8" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The unified logistics operating system for modern Indian brands.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Products</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/products/waresync" className="hover:text-black">WareSync (WMS)</Link></li>
              <li><Link to="/products/swiftship" className="hover:text-black">SwiftShip (Shipping)</Link></li>
              <li><Link to="/problem" className="hover:text-black">The Problem</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Shipping Tools</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/tools/shipping-calculator" className="hover:text-black">Shipping Calculator</Link></li>
              <li><Link to="/tools/volumetric-calculator" className="hover:text-black">Volumetric Calculator</Link></li>
              <li><Link to="/pricing" className="hover:text-black">Pricing Plans</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/why-sendit" className="hover:text-black">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-black">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Connect</h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><a href="#" className="hover:text-black">LinkedIn</a></li>
              <li><a href="#" className="hover:text-black">Twitter</a></li>
              <li><a href="#" className="hover:text-black">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2026 Sendit Logistics Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-slate-400">Terms of Service</span>
            <span className="text-xs text-slate-400">Privacy Policy</span>
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

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {!isLoginPage && <Navbar onContactClick={() => setIsContactOpen(true)} />}
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
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
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
