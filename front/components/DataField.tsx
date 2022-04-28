import React from 'react';
import { ErrorMessage } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

type Value = string | number;

type Option = {
  key: Value;
  value: Value;
}

type Props = {
  type?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  value: string | number | '';
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  options?: Option[] | Value[];
  helperText?: string | React.ReactNode;
  sx?: any;
  inputProps?: any;

}

const DataField = ({
  type = 'text',
  variant = 'standard',
  name,
  label,
  value,
  setFieldValue,
  required,
  disabled,
  options,
  helperText,
  sx,
  inputProps,
}: Props) => {

  return (
    <TextField
      type={type}
      select={type === 'select' ? true : undefined}
      id={`params-${name}`}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value ?? '');
      }}
      label={label}
      placeholder={`${label}${getObjectPostPosition(label)} 입력해 주세요`}
      helperText={<ErrorMessage name={name} /> ?? helperText}
      variant={variant}
      fullWidth
      required={!(disabled === true) && required === true}
      disabled={disabled === true}
      sx={sx}
      inputProps={inputProps}
    >
      {type === 'select' && options && options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          const item: Value = option as Value;
          return <MenuItem key={item} value={item}>{item}</MenuItem>;
        }
        const item: Option = option as Option;
        return <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>;
      })}
    </TextField>
  );
};

export default DataField;
