import React, { forwardRef } from 'react';
import './BookPage.css';

// Usamos forwardRef porque react-pageflip necesita la referencia al elemento DOM
const BookPage = forwardRef(({ 
  number, 
  children, 
  isCover = false, 
  isHard = false, 
  className = '',
  backgroundColor = ''
}, ref) => {
  return (
    <div 
      className={`book-page ${isCover ? 'book-cover-page' : 'book-inner-page'} ${className}`} 
      ref={ref}
      data-density={isHard || isCover ? "hard" : "soft"}
      style={backgroundColor ? { backgroundColor } : {}}
    >
      <div className="page-content">
        {children}
        
        {/* Número de página (no se muestra en portada/contraportada) */}
        {!isCover && number && (
          <div className="page-number">{number}</div>
        )}
      </div>
    </div>
  );
});

BookPage.displayName = 'BookPage';

export default BookPage;
