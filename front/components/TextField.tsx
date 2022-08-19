import React, {
  useContext,
  useMemo,
} from 'react';
import {
  StandardTextFieldProps,
  TextField as MuiTextField
} from '@mui/material';
import {
  FormikContext,
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import {
  DataFieldValue,
  FieldStatus,
  getValue
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
    | 'type' | 'fullWidth' | 'variant' | 'onChange' | 'InputProps' | 'label' | 'error' | 'helperText' | 'value' | 'disabled' | 'required'> {
  name: string;
}

export default function TextField(props: TextFieldProps) {
  const {
          name,
          disableLabel,
          helperText,
          label,
          InputProps,
          type = 'text',
          startAdornment,
          endAdornment,
          required,
          onChange,
          status,
          ...restProps
        } = props;

  const formikContext = useContext(FormikContext);
  if (formikContext) {
    const { values, errors, handleChange } = formikContext;
    const value = useMemo(() => getValue<DataFieldValue>(values, name) ?? '', [values]);
    const edit = useMemo(() => values.edit || typeof values.edit === 'undefined', [values]);
    const error = !!errors[name];
    const disabled = status === FieldStatus.Disabled;
    const readOnly = status === FieldStatus.ReadOnly || !edit;


    const fieldProps: FieldProps = {
      type,
      fullWidth:  true,
      variant:    'standard',
      name,
      value,
      label:      disableLabel ? undefined : label,
      error,
      helperText: error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText,
      disabled,
      required:   edit && required,
      onChange:   (e) => {
        if (onChange) {
          onChange(e);
        }
        handleChange(e);
      },
      InputProps: {
        ...InputProps,
        readOnly,
        startAdornment,
        endAdornment,
      }
    };

    return (
      <MuiTextField
        {...restProps}
        {...fieldProps}
      />
    );
  }
  else {
    const fieldProps: FieldProps = {
      type,
      fullWidth:  true,
      variant:    'standard',
      name,
      label:      disableLabel ? undefined : label,
      InputProps: {
        ...InputProps,
        readOnly: true,
        startAdornment,
        endAdornment,
      }
    };
    return (
      <MuiTextField
        {...restProps}
        {...fieldProps}
      />
    );
  }
}