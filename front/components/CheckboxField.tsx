import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { FormikErrors, FormikValues } from 'formik';
import {
  DataFieldValue,
  Option,
  Tooltip,
  optionKey,
  optionText,
  optionTooltip
} from 'components';

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
  sx?: object;
  size?: 'small';
  disableLabel?: boolean;
  disableAll?: boolean;
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
  size,
  disableLabel,
  disableAll,
}: CheckboxFieldProps) => {
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  const isChecked = (option: Option | DataFieldValue): boolean =>
    typeof value === 'undefined'
      ? false
      : value.includes(optionKey(option));

  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(errors[name]);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  return (
    <FormControl
      id={`params-${name}`}
      variant={variant}
      size={size}
      required={!disableLabel && !(disabled === true) && required === true}
      disabled={disabled === true}
      sx={sx}
      fullWidth
    >
      {!disableLabel && (
        <FormLabel
          component="legend"
        >
          {label}
        </FormLabel>
      )}
      <FormGroup row>
        {!disableAll && (
          <FormControlLabel
            control={
              <Tooltip title={`${label} - 전체`}>
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
              </Tooltip>
            }
            label="전체"
          />
        )}
        {options.map((option) => {
          const key = optionKey(option);
          return (
            <FormControlLabel
              key={key}
              control={
                <Tooltip title={optionTooltip(option) ?? `${label} - ${optionText(option)}`}>
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
                </Tooltip>
              }
              label={optionText(option)}
            />
          );
        })}
      </FormGroup>
      {typeof errors[name] === 'string' && (
        <FormHelperText error>
          {helperMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default CheckboxField;
