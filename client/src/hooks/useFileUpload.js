import { useState, useCallback } from 'react';

const useFileUpload = (options = {}) => {
  const { maxSize = 5 * 1024 * 1024, acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = options;
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const validateFile = (selectedFile) => {
    setError(null);
    
    if (!selectedFile) return false;
    
    if (!acceptedTypes.includes(selectedFile.type)) {
      setError('Formato no soportado. Usa JPG, PNG o WEBP.');
      return false;
    }
    
    if (selectedFile.size > maxSize) {
      setError(`La imagen es muy grande (máximo ${maxSize / (1024 * 1024)}MB).`);
      return false;
    }
    
    return true;
  };

  const handleFile = (selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      
      // Crear preview URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      // Cleanup de URL anterior si existía para evitar memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError(null);
  };

  return {
    file,
    preview,
    error,
    isDragActive,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onChange,
    clearFile,
    setError
  };
};

export default useFileUpload;
