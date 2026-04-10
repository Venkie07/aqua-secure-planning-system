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
    { image: s1, name: "Water Resource Mapping", desc: "Mapping and analyzing water bodies to understand regional resource distribution." },
    { image: s2, name: "Flood Risk Assessment", desc: "Identifying flood-prone zones using elevation, slope, and historical data." },
    { image: s3, name: "Climate Variability Analysis", desc: "Evaluating rainfall trends and climate fluctuations for long-term planning." },
    { image: s4, name: "Industrial Suitability Scoring", desc: "Scoring locations based on water, risk, and operational feasibility." },
    { image: s5, name: "Geospatial Intelligence Dashboard", desc: "Interactive GIS platform for real-time spatial insights and decision-making." },
    { image: s6, name: "AI-Based Recommendation Engine", desc: "AI-powered insights to recommend optimal locations and risk mitigation strategies." },
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