import React, {
  useCallback,
  useMemo
} from 'react';
import {
  StandardTextFieldProps,
  TextField as MuiTextField
} from '@mui/material';
import {
  FormikValues,
  useFormikContext
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import {
  DataFieldValue,
  FieldStatus,
  FieldValue
} from 'components/DataFieldProps';

export interface TextFieldProps
  extends Omit<StandardTextFieldProps,
    | 'name'
    | 'label'
    | 'value'
    | 'fullWidth'
    | 'disabled'> {
  disableLabel?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
  status?: FieldStatus;
}

interface FieldProps
  extends Pick<StandardTextFieldProps,
    | 'onChange' | 'InputProps' | 'label' | 'error' | 'helperText' | 'value' | 'disabled' | 'required'> {
  name: string;
}

export default function TextField(props: TextFieldProps) {
  const {
          disableLabel,
          helperText,
          label,
          name,
          InputProps,
          type = 'text',
          onChange,
          startAdornment,
          endAdornment,
          required,
          status,
          ...restProps
        } = props;
  const { values, errors, handleChange } = useFormikContext<FormikValues>();
  const {
          value,
          edit
        } = useMemo<FieldValue<DataFieldValue>>(() => ({
    value: values[name] ?? '',
    edit:  values.edit !== false
  }), [values]);
  const {
          disabled,
          readOnly
        } = useMemo(() => ({
    disabled: status === FieldStatus.Disabled,
    readOnly: status === FieldStatus.ReadOnly || edit,
  }), [status, edit]);
  const error = useMemo(() => !!errors[name], [errors]);

  const fieldProps: FieldProps = {
    name,
    value,
    label:      disableLabel ? undefined : label,
    error,
    helperText: error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText,
    disabled,
    required:   edit && required,
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
    <MuiTextField
      fullWidth
      variant="standard"
      type={type}
      {...restProps}
      {...fieldProps}
    />
  );
}