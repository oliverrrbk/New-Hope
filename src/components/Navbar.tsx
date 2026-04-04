import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Hjem', path: '/' },
    { name: 'Om os', path: '/om-os' },
    { name: 'Cases', path: '/cases' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] pt-6 px-4 sm:px-6 transition-all duration-500 ease-out flex justify-center pointer-events-none">
      <div className={`pointer-events-auto w-full max-w-4xl px-4 sm:px-6 py-2 sm:py-2.5 flex justify-between items-center rounded-full border transition-all duration-500 relative ${scrolled ? 'bg-white/60 border-white/40 shadow-xl shadow-bison-dark/5 backdrop-blur-xl' : 'bg-white/10 border-white/20 shadow-lg backdrop-blur-md hover:bg-white/15'}`}>
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-[2.75rem] sm:h-[3rem] flex items-center justify-center transition-all duration-300`}
          >
            <img 
              src="/assets/logo-clean.png" 
              alt="Bison Logo" 
              className={`h-full w-auto object-contain transition-all duration-300 ${scrolled ? 'brightness-100' : 'brightness-0 invert'}`} 
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm px-2 font-bold tracking-wide relative py-1 overflow-hidden group ${location.pathname === item.path ? 'text-bison-green' : (scrolled ? 'text-bison-dark/80 hover:text-bison-dark' : 'text-white/90 hover:text-white')} transition-colors duration-300`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-bison-green origin-left transition-transform duration-300 ease-out ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
        </div>

        {/* Desktop Call to action */}
        <div className="hidden md:flex items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/book-et-opkald" className={`relative group overflow-hidden ${scrolled ? 'bg-bison-dark text-white' : 'bg-white text-bison-dark'} px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center`}>
              <span className="relative z-10 transition-colors group-hover:text-bison-dark">Book en snak</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-bison-green to-[#C5E1A5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? 'text-bison-dark bg-bison-dark/5 hover:bg-bison-dark/10' : 'text-white bg-white/10 hover:bg-white/20'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl flex flex-col overflow-hidden md:hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-4"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-lg font-bold p-3 rounded-2xl transition-colors ${location.pathname === item.path ? 'bg-bison-green/20 text-[#8EBE59]' : 'text-bison-dark hover:bg-bison-dark/5'}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <motion.div whileTap={{ scale: 0.95 }} className="mt-2">
                  <Link to="/book-et-opkald" className="bg-bison-dark text-white px-6 py-4 rounded-2xl text-base font-bold text-center block shadow-lg">
                    Book en snak
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
