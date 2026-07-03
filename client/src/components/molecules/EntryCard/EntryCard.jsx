import React from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Badge from '../../atoms/Badge/Badge';
import './EntryCard.css';

const EntryCard = ({ entry, onDelete, onView }) => {
  const { 
    author_name, 
    relationship, 
    message, 
    photoUrl, 
    created_at 
  } = entry;

  // Formatear fecha
  const date = new Date(created_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Truncar mensaje largo para la vista previa
  const truncatedMessage = message.length > 80 
    ? message.substring(0, 80) + '...' 
    : message;

  return (
    <div className="entry-card glass-panel">
      <div className="entry-card-header">
        <div className="entry-card-photo">
          {photoUrl ? (
            <img src={photoUrl} alt={author_name} />
          ) : (
            <div className="photo-placeholder">Sin foto</div>
          )}
        </div>
        <div className="entry-card-info">
          <h3>{author_name}</h3>
          <div className="entry-meta">
            {relationship && <Badge variant="gold">{relationship}</Badge>}
            <span className="entry-date">{date}</span>
          </div>
        </div>
      </div>
      
      <div className="entry-card-body">
        <p className="entry-preview">"{truncatedMessage}"</p>
      </div>
      
      <div className="entry-card-footer">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => onView(entry)}
          icon={<Icon icon={FiEye} size={16} />}
        >
          Ver
        </Button>
        <Button 
          variant="danger" 
          size="sm" 
          onClick={() => onDelete(entry.id)}
          icon={<Icon icon={FiTrash2} size={16} />}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default EntryCard;
