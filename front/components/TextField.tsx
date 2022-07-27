import React, {
  useCallback,
  useMemo
} from 'react';
import {
  StandardTextFieldProps,
  TextField as MuiTextField
} from '@mui/material';
import {
  Field,
  FormikValues,
  useFormikContext
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';

export interface TextFieldProps
  extends Omit<StandardTextFieldProps, | 'name' | 'label' | 'value'> {
  readOnly?: boolean;
  disableLabel?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
}

interface FieldProps
  extends Pick<StandardTextFieldProps,
    | 'onChange' | 'InputProps' | 'label' | 'error' | 'helperText' | 'value'> {
  name: string;
}

export default function TextField(props: TextFieldProps) {
  const {
          disableLabel,
          helperText,
          label,
          name,
          readOnly,
          InputProps,
          type = 'text',
          onChange,
          startAdornment,
          endAdornment,
          ...restProps
        } = props;

  const { values, errors, handleChange } = useFormikContext<FormikValues>();
  const error = useMemo(() => !!errors[name], [errors]);
  const value = useMemo(() => values[name], [values]);
  const fieldProps: FieldProps = {
    name,
    value,
    label:      disableLabel ? undefined : label,
    error,
    helperText: error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText,
    onChange:   useCallback((e: any) => {
      if (onChange) {
        onChange(e);
      }
      handleChange(e);
    }, [handleChange, onChange]),
    InputProps: {
      ...InputProps,
      readOnly,
      startAdornment,
      endAdornment,
    }
  };

  return (
    <Field
      component={MuiTextField}
      fullWidth
      variant="standard"
      type={type}
      {...restProps}
      {...fieldProps}
    />
  );
}