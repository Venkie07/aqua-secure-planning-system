import React, { useEffect, useState } from 'react';
import img2 from '../../assets/slides/2.png';
import img3 from '../../assets/slides/3.png';
import img4 from '../../assets/slides/4.png';
import img5 from '../../assets/slides/5.png';
import img6 from '../../assets/slides/6.png';
import img7 from '../../assets/slides/7.png';

const slides = [
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 },
  { image: img7 },
];

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lp-carousel">
      <button type="button" className="lp-carousel-arrow left" onClick={goPrevious} aria-label="Previous slide">
        ←
      </button>
      <button type="button" className="lp-carousel-arrow right" onClick={goNext} aria-label="Next slide">
        →
      </button>
      <div
        className="lp-carousel-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <article key={idx} className="lp-carousel-slide">
            <img src={slide.image} alt={`Slide ${idx + 1}`} loading="lazy" className="lp-carousel-image" />
            <div className="lp-carousel-overlay" />
          </article>
        ))}
      </div>
      <div className="lp-carousel-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`lp-carousel-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;