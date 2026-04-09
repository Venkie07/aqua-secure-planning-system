import React, { useMemo, useState, useEffect } from 'react';

// Import images
import s1 from "../../assets/services/s1.png";
import s2 from "../../assets/services/s2.png";
import s3 from "../../assets/services/s3.png";
import s4 from '../../assets/services/s4.png';
import s5 from '../../assets/services/s5.png';
import s6 from '../../assets/services/s6.png';

const LogoCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Static 6 images + default text
  const logos = [
    { image: s1, name: "Service 1", desc: "Smart solution for modern needs" },
    { image: s2, name: "Service 2", desc: "Efficient and scalable systems" },
    { image: s3, name: "Service 3", desc: "Innovative tech experience" },
    { image: s4, name: "Service 4", desc: "Reliable and secure platform" },
    { image: s5, name: "Service 5", desc: "High performance delivery" },
    { image: s6, name: "Service 6", desc: "Next-gen digital services" },
  ];

  // Handle responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % logos.length);
    }, 2500); // 2.5 sec

    return () => clearInterval(interval);
  }, []);

  const visibleLogos = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, offset) => {
      return logos[(startIndex + offset) % logos.length];
    });
  }, [startIndex]);

  const goPrevious = () => {
    setStartIndex((prev) => (prev - 1 + logos.length) % logos.length);
  };

  const goNext = () => {
    setStartIndex((prev) => (prev + 1) % logos.length);
  };

  return (
    <div className="lp-logo-rail-wrap">
      <button className="lp-logo-arrow" onClick={goPrevious}>←</button>

      <div className="lp-logo-rail">
        <div className="lp-logo-track">
          {visibleLogos.map((logo, idx) => (
            <div className="lp-logo-card" key={`${logo.name}-${idx}`}>
              
              <img src={logo.image} alt={logo.name} loading="lazy" />

              {/* Footer Text */}
              <div className="lp-logo-footer">
                <h4>{logo.name}</h4>
                <p>{logo.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      <button className="lp-logo-arrow" onClick={goNext}>→</button>
    </div>
  );
};

export default LogoCarousel;