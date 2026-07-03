import React from 'react';
import './ParticleEffect.css';

const ParticleEffect = ({ count = 30 }) => {
  // Generar partículas estáticas pero con animaciones CSS diferentes basadas en nth-child
  const particles = Array.from({ length: count }).map((_, i) => (
    <div key={i} className="particle"></div>
  ));

  return (
    <div className="particles-container">
      {particles}
    </div>
  );
};

export default ParticleEffect;
