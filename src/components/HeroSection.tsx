import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';



const HeroSection = () => {
  const trackRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.children;
    const totalItems = items.length;

    const tickerRestDuration = 75; 
    const slideDuration = 200; 
    const tickerSpeed = tickerRestDuration + slideDuration;

    let tickerIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function playTicker() {
      tickerIndex++;
      
      // Batch DOM updates cleanly inside a single frame callback
      requestAnimationFrame(() => {
        if (track) {
          track.style.transition = `transform ${slideDuration / 1000}s cubic-bezier(0.25, 1, 0.5, 1)`;
          track.style.transform = `translateY(-${tickerIndex * (100 / totalItems)}%)`;
        }
      });

      let nextDelay = tickerSpeed; 
      const checkIndex = tickerIndex % (totalItems - 1);
      
      // Check for the special gold item
      if (items[checkIndex] && items[checkIndex].classList.contains('ticker-item-gold')) { 
        nextDelay = 5000; 
      }

      // Seamless Reset Check
      if (tickerIndex === totalItems - 1) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (track) {
              track.style.transition = "none"; 
              tickerIndex = 0;
              track.style.transform = `translateY(0%)`;
            }
          });
        }, slideDuration); // Fire exactly when the slide finishes
      }

      timeoutId = setTimeout(playTicker, nextDelay);
    }

    // Kick off the loop safely
    timeoutId = setTimeout(playTicker, tickerSpeed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div 
          className="headline-stack"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="static-line">
            HEY, I'M
            <a
              href="#contact"
              className="stroke-text name-button"
              data-text="SATWIK"
            >
              SATWIK
            </a>
          </h1>

          <div className="action-line">
            <span className="action-static">AND I'M&nbsp;</span>
            <span className="ticker-wrapper">
              <span className="ticker-track" id="ticker-track" ref={trackRef}>
                <span className="ticker-item">A GIS EXPERT</span>
                <span className="ticker-item">AN ENGINEER</span>
                <span className="ticker-item">A HYDROLOGIST</span>
                <span className="ticker-item">A BIKER</span>
                <span className="ticker-item">A PHOTOGRAPHER</span>
                <span className="ticker-item">GIS ANALYST</span>
                <span className="ticker-item">A PROBLEM SOLVER</span>
                <span className="ticker-item">A DESIGNER</span>
                <span className="ticker-item-gold">STILL LEARNING.</span>
                <span className="ticker-item">AN ENGINEER</span>
                <span className="ticker-item">A GIS EXPERT</span>
              </span>
            </span>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
