import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

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
      const sections = ['accueil', 'services', 'references', 'about', 'contact'];
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    <nav aria-label="Main Navigation" className="bg-surface border-b border-outline-variant max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center w-full sticky top-0 z-50 transition-opacity duration-200">
      <Link to="/" className="text-2xl font-black tracking-tighter text-primary">KRB CONSEILS</Link>
      
      <div className="hidden md:flex space-x-8">
        <Link to="/#accueil" className={linkClass('accueil')}>{t('Accueil')}</Link>
        <Link to="/#services" className={linkClass('services')}>{t('Services')}</Link>
        <Link to="/projets" className={`transition-colors duration-300 font-label-lg text-label-lg px-3 py-2 ${!isHome && location.pathname === '/projets' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md'}`}>{t('Projets')}</Link>
        <Link to="/#about" className={linkClass('about')}>{t('À Propos')}</Link>
        <Link to="/#contact" className={linkClass('contact')}>{t('Contact')}</Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <button aria-label="Toggle language between French and English" onClick={toggleLanguage} className="text-primary font-label-lg text-label-lg hover:underline font-medium">
          {i18n.language === 'fr' ? 'EN' : 'FR'}
        </button>
        <Link to="/projets" className="bg-primary text-on-primary px-6 py-2.5 rounded font-label-lg text-label-lg hover:bg-secondary transition-all">
          {t('Galerie des Projets')}
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

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-surface shadow-2xl z-[70] md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant">
              <span className="text-xl font-black tracking-tighter text-primary">KRB CONSEILS</span>
              <button 
                className="text-on-surface hover:bg-surface-variant p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-2">
              {[
                { id: '/#accueil', idName: 'accueil', label: t('Accueil') },
                { id: '/#services', idName: 'services', label: t('Services') },
                { id: '/projets', idName: 'projets', label: t('Projets') },
                { id: '/#about', idName: 'about', label: t('À Propos') },
                { id: '/#contact', idName: 'contact', label: t('Contact') }
              ].map((link) => {
                const isMobileActive = link.idName === 'projets' ? (!isHome && location.pathname === '/projets') : isActive(link.idName);
                
                return (
                  <Link
                    key={link.id}
                    to={link.id}
                    onClick={closeMenu}
                    className={`block px-4 py-4 rounded-lg font-label-lg transition-colors ${
                      isMobileActive 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-on-surface-variant hover:bg-surface-variant/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            
            <div className="p-6 border-t border-outline-variant flex flex-col space-y-4">
              <button aria-label="Toggle language between French and English" onClick={toggleLanguage} className="text-primary font-label-lg text-left hover:underline font-medium py-2">
                {i18n.language === 'fr' ? 'Passer à l\'Anglais (EN)' : 'Switch to French (FR)'}
              </button>
              <Link to="/projets" onClick={closeMenu} className="bg-primary text-on-primary px-6 py-3 rounded-lg text-center font-label-lg hover:bg-secondary transition-all w-full">
                {t('Galerie des Projets')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
