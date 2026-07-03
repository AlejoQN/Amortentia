import React from 'react';
import './Icon.css';

// Usamos react-icons como base, este componente es un wrapper
// para estandarizar colores, tamaños y animaciones si es necesario.
const Icon = ({ 
  icon: IconComponent, 
  size = 24, 
  color = 'currentColor', 
  className = '',
  spin = false
}) => {
  if (!IconComponent) return null;

  return (
    <span className={`icon-wrapper ${spin ? 'icon-spin' : ''} ${className}`}>
      <IconComponent size={size} color={color} />
    </span>
  );
};

export default Icon;
