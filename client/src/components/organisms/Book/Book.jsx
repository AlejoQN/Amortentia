import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import BookPage from '../../molecules/BookPage/BookPage';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Book.css';

const Book = ({ entries = [], settings }) => {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const title = settings?.book_title || "Libro de Recuerdos";
  const subtitle = settings?.book_subtitle || "Una colección de momentos y palabras de las personas que más te quieren.";
  
  // Calcular número de páginas basado en entradas (2 páginas por entrada)
  // +1 Portada Exterior
  // +1 Portada Interior
  // +1 Título
  // +1 Página blanca final
  // +1 Contraportada Interior
  // +1 Contraportada Exterior
  const numPages = (entries.length * 2) + 6;

  const nextButtonClick = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const onPage = (e) => {
    setCurrentPage(e.data);
  };

  useEffect(() => {
    setTotalPages(numPages);
  }, [numPages]);

  return (
    <div className="book-wrapper">
      <div className="book-container">
        <HTMLFlipBook 
          width={480} 
          height={650} 
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.2} /* Sombra más suave y realista */
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true} /* Habilita el modo de una sola página en celulares */
          onFlip={onPage}
          className="demo-book"
          ref={bookRef}
        >
          {/* Portada Exterior */}
          <BookPage isCover={true}>
            <h1 className="font-display text-gradient-gold" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {title}
            </h1>
            <div style={{ color: 'var(--gold-light)', fontSize: '1.5rem', marginBottom: '2rem' }}>✧ ✦ ✧</div>
            <p className="font-heading" style={{ fontStyle: 'italic' }}>Hecho con amor</p>
          </BookPage>

          {/* Portada Interior (Blanco - Izquierda) */}
          <BookPage backgroundColor="var(--book-page)" />
          
          {/* Página de Título / Dedicatoria (Derecha) */}
          <BookPage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
              <h2 className="font-display text-gradient-gold" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h2>
              <p className="font-heading text-secondary" style={{ fontStyle: 'italic', maxWidth: '80%' }}>
                {subtitle}
              </p>
            </div>
          </BookPage>

          {/* Páginas dinámicas de entradas (Ahora Foto cae a la Izquierda y Mensaje a la Derecha) */}
          {entries.flatMap((entry, index) => [
              /* Página Izquierda: Foto */
              <BookPage key={`photo-${entry.id || index}`}>
                <div className="page-photo-container">
                  <img 
                    src={entry.photoUrl || "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"} 
                    alt={`Foto de ${entry.author_name}`} 
                    className="page-photo" 
                  />
                </div>
              </BookPage>,
              
              /* Página Derecha: Mensaje */
              <BookPage key={`msg-${entry.id || index}`}>
                <div className="page-message-container">
                  <div className="page-message-content">
                    <p className="page-message-text">{entry.message}</p>
                    <p className="page-message-author">- {entry.author_name}</p>
                    {entry.relationship && (
                      <p className="page-message-relationship">
                        {entry.relationship}
                      </p>
                    )}
                  </div>
                </div>
              </BookPage>
          ])}

          {/* Página blanca para mantener paridad (Izquierda) */}
          <BookPage backgroundColor="var(--book-page)" />

          {/* Contraportada Interior (Blanca - Derecha) */}
          <BookPage backgroundColor="var(--book-page)" />

          {/* Contraportada Exterior (Cierre - Izquierda) */}
          <BookPage isCover={true}>
            <div style={{ opacity: 0.7 }}>
              <div style={{ color: 'var(--gold-light)', fontSize: '2rem', marginBottom: '1rem' }}>✨</div>
              <p className="font-heading">Fin</p>
            </div>
          </BookPage>

        </HTMLFlipBook>
      </div>

      {/* Controles de navegación */}
      <div className="book-controls">
        <Button 
          variant="secondary" 
          onClick={prevButtonClick} 
          disabled={currentPage === 0}
          icon={<Icon icon={FiChevronLeft} />}
          className="book-nav-btn"
        >
          Anterior
        </Button>
        <span className="book-page-indicator font-heading">
          {currentPage} / {totalPages}
        </span>
        <Button 
          variant="secondary" 
          onClick={nextButtonClick} 
          disabled={currentPage >= totalPages - 1}
          className="book-nav-btn"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Siguiente <Icon icon={FiChevronRight} />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Book;
