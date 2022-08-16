import {
  MenuItem,
  StandardTextFieldProps,
  TextField
} from '@mui/material';
import React, {
  useCallback,
  useContext,
  useMemo
} from 'react';
import {
  DataFieldValue,
  FieldStatus,
  getValue,
  isOption,
  Option
} from 'components/DataFieldProps';
import {
  FormikContext,
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';

export interface SelectFieldProps
  extends Omit<StandardTextFieldProps,
    | 'name'
    | 'label'
    | 'value'
    | 'fullWidth'
    | 'disabled'> {
  options: Option[] | DataFieldValue[] | null;
  disableLabel?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
  status?: FieldStatus;
  multiple?: boolean;
}

interface FieldProps
  extends Pick<StandardTextFieldProps,
    | 'select'
    | 'fullWidth'
    | 'variant'
    | 'onChange'
    | 'InputProps'
    | 'SelectProps'
    | 'label'
    | 'error'
    | 'helperText'
    | 'value'
    | 'disabled'
    | 'required'
    | 'children'> {
  name: string;
}

export default function SelectField(props: SelectFieldProps) {
  const {
          name,
          label,
          disableLabel,
          startAdornment,
          endAdornment,
          helperText,
          required,
          status,
          multiple,
          defaultValue,
          InputProps,
          SelectProps,
          onChange,
          options,
          ...restProps
        } = props;

  const children = useMemo(() => {
    if (!options) {
      return null;
    }
    return options.map((option) => {
      if (isOption(option)) {

        return (
          <MenuItem key={option.key} value={option.key}>
            {option.text}
          </MenuItem>
        );
      }
      return (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      );
    });
  }, [options]);

  const formikContext = useContext(FormikContext);
  if (formikContext) {
    const { values, errors, handleChange } = formikContext;
    const value = getValue<any>(values, name) ?? defaultValue ?? '';
    const edit = values.edit || typeof values.edit === 'undefined';
    const disabled = status === FieldStatus.Disabled;
    const readOnly = status === FieldStatus.ReadOnly && !edit;
    const error = !!errors[name];

    const fieldProps: FieldProps = {
      select:      true,
      fullWidth:   true,
      variant:     'standard',
      name,
      value:       children === null || !options || options.length === 0 ? '' : value,
      label:       disableLabel ? undefined : label,
      error,
      helperText:  error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText,
      disabled,
      required:    edit && required,
      onChange:    useCallback((e: any) => {
        if (onChange) {
          onChange(e);
        }
        handleChange(e);
      }, [handleChange, onChange]),
      InputProps:  {
        ...InputProps,
        readOnly,
        startAdornment,
        endAdornment: <>
                        {endAdornment}
                        {InputProps?.endAdornment}
                      </>,
      },
      SelectProps: {
        ...SelectProps,
        multiple,
      },
      children
    };

    return (
      <TextField
        {...restProps}
        {...fieldProps}
      />
    );

  }
  else {
    const fieldProps: FieldProps = {
      select:      true,
      fullWidth:   true,
      variant:     'standard',
      name,
      label:       disableLabel ? undefined : label,
      InputProps:  {
        ...InputProps,
        readOnly:     true,
        startAdornment,
        endAdornment: <>
                        {endAdornment}
                        {InputProps?.endAdornment}
                      </>,
      },
      SelectProps: {
        ...SelectProps,
        multiple,
      },
      value:       '',
      children
    };

    return (
      <TextField
        {...restProps}
        {...fieldProps}
      />
    );
  }

}