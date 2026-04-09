import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/landing/LandingNavbar';
import ImageCarousel from '../components/landing/ImageCarousel';
import LogoCarousel from '../components/landing/LogoCarousel';
import heroImage from '../assets/hero.png';
import projectImage from '../assets/image.png';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import './LandingPage.css';
import { isAuthenticated } from '../utils/auth';

const brandLogos = [
  { name: 'Narmada Infra', image: projectImage },
  { name: 'HydroGrid Labs', image: reactLogo },
  { name: 'MetroBuild Group', image: viteLogo },
  { name: 'AquaAxis Energy' },
  { name: 'BlueTerrain Works' },
  { name: 'RiverCore Projects' },
];

const techList = [
  { name: 'React', icon: '⚛' },
  { name: 'Node.js', icon: '⬢' },
  { name: 'Python', icon: '🐍' },
  { name: 'AI/ML', icon: '🧠' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.lp-section'));
    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    const getNearestSectionIndex = () => {
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, idx) => {
        const distance = Math.abs(section.getBoundingClientRect().top);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = idx;
        }
      });

      return nearestIndex;
    };

    const handleKey = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
        return;
      }

      e.preventDefault();
      const currentIndex = getNearestSectionIndex();
      const nextIndex =
        e.key === 'ArrowDown'
          ? Math.min(currentIndex + 1, sections.length - 1)
          : Math.max(currentIndex - 1, 0);

      sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const openAspsPlatform = () => {
    if (loggedIn) {
      navigate('/dashboard');
      return;
    }
    navigate('/login');
  };

  return (
    <div className="company-site">
      <LandingNavbar />

      <main className="lp-main">
        <section id="home" className="lp-home lp-section">
          <ImageCarousel />
        </section>

        {/* <section className="lp-section lp-clients section-space">
          <div className="lp-section-head">
            <p className="lp-overline">WORKING WITH INDIA'S LEADING BRANDS</p>
            <h2>Trusted by teams building modern infrastructure</h2>
          </div>
          <LogoCarousel logos={brandLogos} />
        </section> */}


        <section id="about" className="lp-section lp-about section-space">
          <div className="lp-section-head">
            <p className="lp-overline">ABOUT US</p>
            <h2>Engineering resilient water futures</h2>
          </div>
          <p>
            We help companies and urban planners make responsible infrastructure decisions with reliable
            water intelligence. Our mission is to combine domain expertise and modern technology to reduce
            project risk and improve long-term sustainability outcomes.
          </p>
        </section>

        <section id="services" className="lp-section lp-services section-space">
          <div className="lp-section-head">
            <h2>SERVICES</h2>
            <p className="lp-overline">Consulting and implementation services</p>
            
          </div>

            <LogoCarousel logos={brandLogos} />

        </section>

        <section id="solutions" className="lp-section lp-solutions section-space">
          <div className="lp-section-head">
            <p className="lp-overline">SOLUTIONS</p>
            <h2>ASPS Platform</h2>
          </div>
          <article className="lp-service-card">
            <img src={projectImage} alt="ASPS project" loading="lazy" />
            <div>
              <h3>Aqua Secure Planning System (ASPS)</h3>
              <p>
                Analyze project feasibility, review water requirements, and run risk prediction workflows
                through our secure planning platform.
              </p>
              <button type="button" className="lp-btn-primary" onClick={openAspsPlatform}>
                {loggedIn ? 'Open ASPS Dashboard' : 'Login to Access ASPS'}
              </button>
            </div>
          </article>
          <div className="lp-preview-grid">
            <div className="lp-preview-item">Project search and retrieval</div>
            <div className="lp-preview-item">Location-based risk insights</div>
            <div className="lp-preview-item">Prediction dashboard and recommendations</div>
          </div>
        </section>

        <section id="technologies" className="lp-section lp-tech section-space">
          <div className="lp-section-head">
            <p className="lp-overline">TECHNOLOGY</p>
            <h2>Built with a modern stack</h2>
          </div>
          <div className="lp-tech-grid">
            {techList.map((tech) => (
              <article key={tech.name} className="lp-tech-card">
                <span className="lp-tech-icon" aria-hidden="true">{tech.icon}</span>
                <h3>{tech.name}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="lp-footer lp-section section-space">
        <div>
          <h3>Contact</h3>
          <p>Email: contact@aquasecure.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 12 Waterline Avenue, Chennai, India</p>
        </div>
        <div>
          <h3>Follow Us</h3>
          <p>LinkedIn | X | YouTube</p>
        </div>
        <p className="lp-copyright">© 2026 Aqua Secure Planning System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;