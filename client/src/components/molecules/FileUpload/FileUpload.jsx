import React, { useRef } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import Icon from '../../atoms/Icon/Icon';
import './FileUpload.css';

const FileUpload = ({ 
  label = "Sube una foto con ella (Si no tienes, cualquiera que traiga a tu mente su persona sirve)", 
  error, 
  fileHook,
  className = '' 
}) => {
  const inputRef = useRef(null);
  
  const {
    preview,
    fileError, // del hook (lo renombramos en la desestructuración original pero aquí lo tomamos de props si no pasamos el hook entero)
    isDragActive,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onChange,
    clearFile
  } = fileHook;

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Mostrar el error del hook o el error pasado por prop
  const displayError = fileHook.error || error;

  return (
    <div className={`file-upload-wrapper ${className}`}>
      {label && <label className="file-upload-label">{label}</label>}
      
      <div 
        className={`file-upload-zone ${isDragActive ? 'drag-active' : ''} ${displayError ? 'has-error' : ''}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={handleClick}
      >
        <input 
          type="file" 
          ref={inputRef} 
          onChange={onChange} 
          accept="image/jpeg, image/png, image/webp" 
          className="file-upload-input"
        />
        
        {preview ? (
          <div className="file-upload-preview">
            <img src={preview} alt="Preview" />
            <button 
              type="button" 
              className="file-upload-clear" 
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
            >
              <Icon icon={FiX} size={16} />
            </button>
          </div>
        ) : (
          <div className="file-upload-placeholder">
            <div className={`upload-icon-container ${isDragActive ? 'animate-bounce' : ''}`}>
              <Icon icon={FiUploadCloud} size={32} />
            </div>
            <p className="upload-text">
              <span className="text-gradient-gold font-bold">Haz clic para subir</span> o arrastra y suelta
            </p>
            <p className="upload-hint">JPG, PNG o WEBP (máx. 5MB)</p>
          </div>
        )}
      </div>
      
      {displayError && <span className="file-upload-error">{displayError}</span>}
    </div>
  );
};

export default FileUpload;
