import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // Handle hash scroll on mount or location change
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = ['accueil', 'services', 'references', 'about'];
      let current = 'accueil';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on your layout (~100-200px offset from top)
          if (rect.top <= 150) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const isActive = (path: string) => isHome && activeSection === path;

  const linkClass = (path: string) => 
    `transition-colors duration-300 font-label-lg text-label-lg px-3 py-2 ${
      isActive(path) 
        ? 'text-primary border-b-2 border-primary pb-1' 
        : 'text-on-surface-variant hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md'
    }`;

  const closeMenu = () => setIsMenuOpen(false);
  const MotionLink = motion.create(Link);

  return (
    <nav aria-label="Main Navigation" className="bg-surface border-b border-outline-variant max-w-7xl mx-auto px-8 h-20 flex justify-between items-center w-full sticky top-0 z-50 transition-opacity duration-200">
      <Link to="/" className="text-2xl font-black tracking-tighter text-primary">KRB CONSEILS</Link>
      
      <div className="hidden md:flex space-x-8">
        <Link to="/#accueil" className={linkClass('accueil')}>Accueil</Link>
        <Link to="/#services" className={linkClass('services')}>Services</Link>
        <Link to="/projets" className={`transition-colors duration-300 font-label-lg text-label-lg px-3 py-2 ${!isHome && location.pathname === '/projets' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md'}`}>Projets</Link>
        <Link to="/#about" className={linkClass('about')}>À Propos</Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <button aria-label="Toggle language between French and English" className="text-primary font-label-lg text-label-lg hover:underline font-medium">FR / EN</button>
        <Link to="/projets" className="bg-primary text-on-primary px-6 py-2.5 rounded font-label-lg text-label-lg hover:bg-secondary transition-all">
          Galerie des Projets
        </Link>
      </div>
      
      <button 
        className="md:hidden text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.3, 
                  ease: "easeOut",
                  staggerChildren: 0.05
                } 
              }
            }}
            className="absolute top-20 left-0 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant p-4 flex flex-col space-y-2 md:hidden shadow-lg overflow-hidden z-50"
          >
            {[
              { id: '/#accueil', idName: 'accueil', label: 'Accueil' },
              { id: '/#services', idName: 'services', label: 'Services' },
              { id: '/projets', idName: 'projets', label: 'Projets' },
              { id: '/#about', idName: 'about', label: 'À Propos' }
            ].map((link) => {
              const isMobileActive = link.idName === 'projets' ? (!isHome && location.pathname === '/projets') : isActive(link.idName);
              
              return (
                <MotionLink
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
                  }}
                  to={link.id}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg transition-colors font-label-lg ${
                    isMobileActive 
                      ? 'bg-primary/10 text-primary font-bold' 
                      : 'text-on-surface-variant hover:bg-surface-variant/50'
                  }`}
                >
                  {link.label}
                </MotionLink>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
