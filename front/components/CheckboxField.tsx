import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import { DataFieldValue, Option, optionKey, optionText } from 'components/DataField';
import { ErrorMessage, FormikErrors, FormikValues } from 'formik';

export type CheckboxFieldProps = {
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  value: DataFieldValue[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>,
  required?: boolean;
  disabled?: boolean;
  options: Option[] | DataFieldValue[];
  helperText?: string | React.ReactNode;
  sx?: any;
  size?: 'small';
}
const CheckboxField = ({
  variant,
  name,
  label,
  value,
  setFieldValue,
  errors,
  required,
  disabled,
  options,
  helperText,
  sx,
  size
}: CheckboxFieldProps) => {
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  const isChecked = (option: Option | DataFieldValue): boolean =>
    typeof value === 'undefined'
      ? false
      : value.includes(optionKey(option));

  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(<ErrorMessage name={name} />);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  return (
    <FormControl
      id={`params-${name}`}
      variant={variant}
      size={size}
      required={!(disabled === true) && required === true}
      disabled={disabled === true}
      sx={sx}
      fullWidth
    >
      <FormLabel
        component="legend"
        error={typeof errors[name] === 'string'}
      >
        {label}
      </FormLabel>
      <FormGroup
        row
      >
        <FormControlLabel
          control={
            <Checkbox
              name={`${name}-all`}
              checked={value && options.length === value.length}
              onChange={() => {
                if (value && options.length === value.length) {
                  setFieldValue(name, []);
                } else {
                  setFieldValue(name, options.map(optionKey));
                }
              }
              }
            />
          }
          label="전체"
        />
        {options.map((option) => {
          const key = optionKey(option);
          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  name={name}
                  value={key}
                  checked={isChecked(option)}
                  onChange={() => {
                    if (isChecked(option) && value) {
                      setFieldValue(name, value.filter(item => item !== key));
                    } else {
                      setFieldValue(name, [...(value ?? []), optionKey(option)]);
                    }
                  }}
                />
              }
              label={optionText(option)}
            />
          );
        })}
      </FormGroup>
      <FormHelperText error={typeof errors[name] === 'string'}>
        {helperMessage}
      </FormHelperText>
    </FormControl>
  );
};
export default CheckboxField;
