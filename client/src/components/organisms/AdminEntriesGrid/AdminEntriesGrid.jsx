import React from 'react';
import EntryCard from '../../molecules/EntryCard/EntryCard';
import './AdminEntriesGrid.css';

const AdminEntriesGrid = ({ entries, onDelete, onView }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No hay recuerdos todavía</h3>
        <p>Los mensajes que agreguen aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="admin-entries-grid">
      {entries.map(entry => (
        <EntryCard 
          key={entry.id} 
          entry={entry} 
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default AdminEntriesGrid;
