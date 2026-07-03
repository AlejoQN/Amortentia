import React from 'react';
import { motion } from 'framer-motion';
import './BookCover.css';

const BookCover = ({ onClick, settings }) => {
  const title = settings?.book_title || "Libro de Recuerdos";
  const subtitle = settings?.book_subtitle || "Una colección de momentos y palabras de las personas que más te quieren.";

  return (
    <motion.div 
      className="book-cover-container animate-float-large"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="book-cover">
        <div className="book-spine"></div>
        <div className="book-front">
          <div className="book-front-border">
            <h1 className="book-title font-display text-gradient-gold">
              {title}
            </h1>
            <div className="book-ornament">
              ✧ ✦ ✧
            </div>
            <p className="book-subtitle font-heading">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="book-pages-edge"></div>
      </div>
      <div className="book-shadow"></div>
    </motion.div>
  );
};

export default BookCover;
