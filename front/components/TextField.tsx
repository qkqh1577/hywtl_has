import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
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
  equals,
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
    | 'type'
    | 'onChange'
    | 'onBlur'
    | 'InputProps'
    | 'label'
    | 'error'
    | 'helperText'
    | 'value'
    | 'disabled'
    | 'required'> {
  name: string;
}

interface ViewProps
  extends Omit<TextFieldProps, | 'status'
                               | 'startAdornment'
                               | 'endAdornment'
                               | 'disableLabel'
                               | 'label'>,
          Pick<StandardTextFieldProps, | 'label'
                                       | 'value'> {

}

function TextFieldView(props: ViewProps) {
  return (<MuiTextField fullWidth variant="standard" {...props} />);
}

export default function TextField(props: TextFieldProps) {
  const {
          name,
          InputProps,
          type = 'text',
          startAdornment,
          endAdornment,
          required,
          onChange,
          onBlur,
          status,
          label:        propsLabel,
          disableLabel: propsDisableLabel,
          helperText:   propsHelperText,
          ...           restProps
        } = props;
  const formikContext = useContext(FormikContext);
  const values = formikContext?.values ?? {};
  const errors = formikContext?.errors ?? {};
  const handleChange = formikContext?.handleChange ?? undefined;

  const formikValue = getValue<DataFieldValue>(values, name) ?? '';
  const formikEdit = values.edit || typeof values.edit === 'undefined';
  const formikError = !!errors[name];

  const [value, setValue] = useState<any>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const label = useMemo(() => propsDisableLabel ? undefined : propsLabel, [propsDisableLabel, propsLabel]);
  const helperText = useMemo(() => error ? `${propsLabel}${getAuxiliaryPostPosition(propsLabel)} 필수 항목입니다.` : propsHelperText, [propsLabel, propsHelperText]);

  const disabled = useMemo(() => status === FieldStatus.Disabled, [status]);
  const readOnly = useMemo(() => status === FieldStatus.ReadOnly || !edit, [status, edit]);

  useEffect(() => {
    if (!equals(value, formikValue)) {
      setValue(formikValue);
    }
  }, [formikValue]);

  useEffect(() => {
    if (formikEdit !== edit) {
      setEdit(formikEdit);
    }
  }, [formikEdit]);

  useEffect(() => {
    if (formikError !== error) {
      setError(formikError);
    }
  }, [formikError]);

  const fieldProps: FieldProps = {
    type,
    name,
    value,
    label,
    error,
    helperText,
    disabled,
    required:   edit && required,
    onChange:   (e) => {
      if (onChange) {
        onChange(e);
      }
      setValue(e.target.value ?? '');
    },
    onBlur:     (e) => {
      if (onBlur) {
        onBlur(e);
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
    <TextFieldView
      {...restProps}
      {...fieldProps}
    />
  );
}