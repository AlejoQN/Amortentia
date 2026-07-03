import React from 'react';
import Input from '../../atoms/Input/Input';
import TextArea from '../../atoms/TextArea/TextArea';

// Un componente wrapper que decide qué input renderizar según el tipo
const FormField = React.forwardRef(({ type = 'text', ...props }, ref) => {
  if (type === 'textarea') {
    return <TextArea ref={ref} {...props} />;
  }
  
  return <Input type={type} ref={ref} {...props} />;
});

FormField.displayName = 'FormField';

export default FormField;
