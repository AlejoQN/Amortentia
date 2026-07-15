import React, { useMemo } from 'react';
import './ParticleEffect.css';

const ParticleEffect = ({ count = 40 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // 3 layers of depth for parallax effect
      const layer = i % 3; // 0 (back), 1 (middle), 2 (front)
      const size = layer === 0 ? 3 : layer === 1 ? 5 : 8;
      const opacity = layer === 0 ? 0.3 : layer === 1 ? 0.6 : 0.9;
      const duration = layer === 0 ? 25 : layer === 1 ? 18 : 12; // front moves faster
      
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      
      const style = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        opacity: opacity,
        animationDuration: `${duration}s`,
        animationDelay: `-${delay}s`,
        zIndex: layer
      };

      return (
        <div key={i} className={`particle layer-${layer}`} style={style}></div>
      );
    });
  }, [count]);

  return (
    <div className="particles-container">
      {particles}
    </div>
  );
};

export default ParticleEffect;
