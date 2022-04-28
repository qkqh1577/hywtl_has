import React from 'react';
import { ErrorMessage } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

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
  placeholder?: string;
  value: Value | '';
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  options?: Option[] | Value[];
  helperText?: string | React.ReactNode;
  sx?: any;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  InputProps?: Partial<OutlinedInputProps>;
}

const DataField = ({
  type = 'text',
  variant = 'standard',
  name,
  label,
  placeholder,
  value,
  setFieldValue,
  required,
  disabled,
  options,
  helperText,
  sx,
  InputProps,
  onFocus,
  onKeyDown,
  onKeyUp,
}: Props) => {

  return (
    <TextField
      type={type}
      variant={variant}
      select={type === 'select' ? true : undefined}
      id={`params-${name}`}
      name={name}
      value={value}
      label={label}
      onChange={(e) => {
        setFieldValue(name, e.target.value ?? '');
      }}
      placeholder={placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`}
      helperText={<ErrorMessage name={name} /> ?? helperText}
      required={!(disabled === true) && required === true}
      disabled={disabled === true}
      sx={sx}
      InputProps={{
        ...InputProps,
        onFocus,
        onKeyDown,
        onKeyUp,
      }}
      fullWidth
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
