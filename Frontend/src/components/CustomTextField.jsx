import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, variant, fullWidth, value, onChange, margin, id }) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      margin="10px"
      id={id}
    />
  );
};

export default CustomTextField;
