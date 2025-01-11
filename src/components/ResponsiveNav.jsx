import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const ResponsiveNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { id: 'story', href: '#story', label: 'Our Story' },
    { id: 'gallery', href: '#gallery', label: 'Gallery' },
    { id: 'details', href: '#details', label: 'Details' },
];

useEffect(() => {
    const handleScroll = () => {
      // Update nav background
      setIsScrolled(window.scrollY > 50);
  
      // Update active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;
  
      const currentSection = sections.reduce((current, section) => {
        if (!section) return current;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          return section.id;
        }
        return current;
      }, '');
  
      setActiveSection(currentSection);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]); // Added navLinks to dependency array

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navHeight = 64; // Height of fixed navbar
      const sectionTop = section.offsetTop;
      
      window.scrollTo({
        top: sectionTop - navHeight,
        behavior: 'smooth'
      });

      // Update URL without causing a page jump
      window.history.pushState(null, '', `#${sectionId}`);
      
      // Close mobile menu
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className={`font-serif text-xl ${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:opacity-80 transition-opacity`}
            >
              S & N
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`transition-all duration-300 relative ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-gray-900' 
                    : 'text-white/80 hover:text-white'
                } ${activeSection === link.id ? 'font-medium' : ''}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-600' : 'text-white'
              } hover:opacity-80 transition-opacity`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen 
              ? 'max-h-64 opacity-100' 
              : 'max-h-0 opacity-0'
          } overflow-hidden bg-white/95 backdrop-blur-sm rounded-b-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`w-full text-left block px-3 py-2 rounded-md text-base transition-colors duration-300
                  ${activeSection === link.id 
                    ? 'text-primary font-medium bg-primary/10' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNav;