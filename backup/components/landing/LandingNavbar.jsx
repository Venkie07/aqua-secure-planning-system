import React, { useEffect, useRef, useState } from 'react';
import leftLogo from '../../assets/image.png';
import rightLogo from '../../assets/tata.png';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Technologies', id: 'technologies' },
  { label: 'Contact', id: 'contact' },
];

const LandingNavbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMenuOpen(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!navRef.current || navRef.current.contains(event.target)) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="lp-nav" ref={navRef}>
      <div className="lp-nav-shell">
        <div className="lp-nav-left">
          <button
            type="button"
            className="lp-hamburger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="lp-primary-navigation"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
          <img src={leftLogo} alt="Company logo" className="lp-logo lp-logo-left" loading="lazy" />
        </div>

        <div className="lp-nav-center">
          <p className="lp-company-name">Aqua Secure Planning System</p>
          <p className="lp-company-tag">Water Intelligence for Smarter Infrastructure</p>
        </div>

        <div className="lp-nav-right">
          <div id="lp-primary-navigation" className={`lp-nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`lp-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <img
            src={rightLogo}
            alt="Partner logo"
            className="lp-logo lp-logo-right"
            loading="lazy"
          />
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;