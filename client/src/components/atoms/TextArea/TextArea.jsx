import React, { forwardRef, useState } from 'react';
import './TextArea.css';

const TextArea = forwardRef(({ 
  label, 
  error, 
  className = '', 
  maxLength,
  onChange,
  ...props 
}, ref) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && <label className="textarea-label">{label}</label>}
      <div className={`textarea-container ${error ? 'has-error' : ''}`}>
        <textarea 
          ref={ref} 
          className="textarea-field" 
          onChange={handleChange}
          maxLength={maxLength}
          {...props} 
        />
      </div>
      <div className="textarea-footer">
        {error ? (
          <span className="textarea-error-msg">{error}</span>
        ) : (
          <span></span>
        )}
        {maxLength && (
          <span className="textarea-counter">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
