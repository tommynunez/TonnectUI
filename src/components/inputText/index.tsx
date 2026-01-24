import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { validateEmail } from '../../services/helper/validator';

const HelperText = (label: string, fieldType: string, value: any, isError?: boolean) => {
     if (!isError) {
          return;
     }

     if (fieldType === "text" || fieldType === "password") {
          return `${label} is required`;
     }

     if (fieldType === 'email' && !value) {
          return `${label} is required`;
     } else if (fieldType === 'email' && !validateEmail(value)) {
          return `${label} is not an email address`;
     }

     return '';
}

const InputText = (name: string, label: string = "", type: string = "", isRequired: boolean) => {
     const [value, setValue] = useState("");
     const [isError, setIserrorValue] = useState(false);

     const handleOnBlur = (event: any) => {
          if (!event.target.value) {
               setIserrorValue(true);

          } else {
               setIserrorValue(false);
          }

          if (event.target.type === "email") {
               if (!validateEmail(event.target.value)) {
                    setIserrorValue(true);
               } else {
                    setIserrorValue(false);
               }
          }
     }

     const field = <TextField
          fullWidth
          variant="outlined"
          id={`textfield-${name}`}
          label={label}
          type={type}
          name={name}
          error={isError}
          required={isRequired}
          tabIndex={0}
          helperText={HelperText(label, type, value, isError)}
          onBlur={(event: any) => { handleOnBlur(event) }}
          onChange={(event: any) => { setValue(event.target.value); }}
     />
     return [value, field, setIserrorValue] as const;
}

export default InputText;