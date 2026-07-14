import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import BookPage from '../../molecules/BookPage/BookPage';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Book.css';

const categorizeEntries = (entries) => {
  const categories = {
    amigos: [],
    familia: [],
    novio: [],
    abuelos: [],
    otros: []
  };

  entries.forEach(entry => {
    const rel = (entry.relationship || '').toLowerCase().trim();
    
    if (rel.includes('novio') || rel.includes('pareja') || rel.includes('esposo') || rel.includes('prometido') || rel.includes('enamorado')) {
      categories.novio.push(entry);
    } else if (rel.includes('abuel')) {
      categories.abuelos.push(entry);
    } else if (rel.includes('mamá') || rel.includes('papá') || rel.includes('madre') || rel.includes('padre') || 
             rel.includes('herman') || rel.includes('prim') || rel.includes('tí') || rel.includes('tia') || 
             rel.includes('tio') || rel.includes('famili') || rel.includes('cuñad') || rel.includes('suegr') || rel.includes('hij')) {
      categories.familia.push(entry);
    } else if (rel.includes('amig') || rel.includes('mejor amig') || rel.includes('pana') || rel.includes('compañer')) {
      categories.amigos.push(entry);
    } else {
      categories.amigos.push(entry);
    }
  });

  return categories;
};

const Book = ({ entries = [], settings }) => {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const title = settings?.book_title || "Libro de Recuerdos";
  const subtitle = settings?.book_subtitle || "Una colección de momentos y palabras de las personas que más te quieren.";
  
  const grouped = categorizeEntries(entries);

  const sections = [
    {
      id: 'amigos',
      title: 'Amigos',
      quote: "Son nuestras elecciones las que muestran lo que somos, mucho más que nuestras habilidades.",
      text: "La verdadera magia no reside en los hechizos, sino en los amigos que nos acompañan en cada aventura. Al igual que el trío de oro, unidos hacemos que cada momento sea inolvidable.",
      entries: grouped.amigos,
      alwaysShow: true
    },
    {
      id: 'familia',
      title: 'Familia',
      quote: "El amor deja su propia marca... haber sido amado tan profundamente, te dará protección para siempre.",
      text: "Como el encantamiento Patronus más poderoso, el amor de la familia nos protege, nos ilumina en la oscuridad y nos guía en cada paso del camino.",
      entries: grouped.familia,
      alwaysShow: true
    },
    {
      id: 'novio',
      title: 'Tu Novio',
      quote: "—¿Después de todo este tiempo?\n—Siempre.",
      text: "Eres mi Snitch Dorada, la magia que ilumina mis días. Mi historia favorita siempre será la nuestra.",
      entries: grouped.novio,
      alwaysShow: true
    },
    {
      id: 'abuelos',
      title: 'Un Homenaje Eterno',
      quote: "Para las mentes bien organizadas, la muerte no es más que la siguiente gran aventura.",
      text: "Aquellos que nos aman jamás nos abandonan realmente. Este es un pequeño homenaje a tus tres abuelos, tres estrellas que siempre brillarán cuidándote desde el cielo.",
      entries: grouped.abuelos,
      alwaysShow: true
    }
  ];

  const bookPages = [];

  // Portada Exterior (Right - 0)
  bookPages.push(
    <BookPage isCover={true} key="cover-front">
      <h1 className="font-display text-gradient-gold" style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
        {title}
      </h1>
      <div style={{ color: 'var(--gold-light)', fontSize: '1.5rem', marginBottom: '2rem' }}>✧ ✦ ✧</div>
      <p className="font-heading" style={{ fontStyle: 'italic' }}>Hecho con amor</p>
    </BookPage>
  );

  // Portada Interior (Left - 1)
  bookPages.push(<BookPage backgroundColor="var(--book-page)" key="cover-inner-left" />);
  
  // Título / Dedicatoria (Right - 2)
  bookPages.push(
    <BookPage key="title-page">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '1rem' }}>
        <h2 className="font-display text-gradient-gold" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h2>
        <p className="font-heading text-secondary" style={{ fontStyle: 'italic', maxWidth: '80%' }}>
          {subtitle}
        </p>
      </div>
    </BookPage>
  );

  const activeSections = sections.filter(s => s.entries.length > 0 || s.alwaysShow);

  activeSections.forEach((section, sIdx) => {
    // Asegurar que la página de título de sección caiga en la página Derecha (índice par).
    if (bookPages.length % 2 !== 0) {
      bookPages.push(<BookPage backgroundColor="var(--book-page)" key={`blank-before-${section.id}`} />);
    }

    // Página de Título de Sección (Right)
    bookPages.push(
      <BookPage key={`section-${section.id}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '2rem' }}>
          <h2 className="font-display text-gradient-gold" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{section.title}</h2>
          {section.quote && (
            <p className="font-heading text-secondary" style={{ fontStyle: 'italic', marginBottom: '2rem', fontSize: '1.2rem', whiteSpace: 'pre-line' }}>
              "{section.quote}"
            </p>
          )}
          <p className="page-message-text" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{section.text}</p>
        </div>
      </BookPage>
    );

    // Entradas de la sección
    section.entries.forEach((entry, eIdx) => {
      // Las entradas (Foto Izquierda, Mensaje Derecha) deben comenzar en página Izquierda (índice impar).
      if (bookPages.length % 2 === 0) {
        bookPages.push(<BookPage backgroundColor="var(--book-page)" key={`blank-before-entry-${entry.id || eIdx}`} />);
      }

      bookPages.push(
        <BookPage key={`photo-${entry.id || `${section.id}-${eIdx}`}`}>
          <div className="page-photo-container">
            <img 
              src={entry.photoUrl || "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"} 
              alt={`Foto de ${entry.author_name}`} 
              className="page-photo" 
            />
          </div>
        </BookPage>
      );
      
      bookPages.push(
        <BookPage key={`msg-${entry.id || `${section.id}-${eIdx}`}`}>
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
      );
    });
  });

  // Contraportada interior debe ser Derecha y exterior Izquierda.
  if (bookPages.length % 2 !== 0) {
    bookPages.push(<BookPage backgroundColor="var(--book-page)" key="pad-before-end" />);
  }

  // Contraportada Interior (Blanca - Derecha)
  bookPages.push(<BookPage backgroundColor="var(--book-page)" key="back-inner" />);

  // Contraportada Exterior (Cierre - Izquierda)
  bookPages.push(
    <BookPage isCover={true} key="back-cover">
      <div style={{ opacity: 0.7, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '2rem', marginBottom: '1rem' }}>✨</div>
        <p className="font-heading">Fin</p>
      </div>
    </BookPage>
  );

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
    setTotalPages(bookPages.length);
  }, [bookPages.length]);

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
          maxShadowOpacity={0.2}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true}
          onFlip={onPage}
          className="demo-book"
          ref={bookRef}
        >
          {bookPages}
        </HTMLFlipBook>
      </div>

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

