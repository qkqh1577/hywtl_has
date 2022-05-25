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
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export type CheckboxFieldProps = {
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  value: DataFieldValue[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>,
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  options: Option[] | DataFieldValue[];
  helperText?: string | React.ReactNode;
  sx?: SxProps<Theme>;
  size?: 'small';
  disableLabel?: boolean;
  disableAll?: boolean;
  readOnly?: boolean;
}
const CheckboxField = ({
  variant,
  name,
  label,
  value,
  setFieldValue,
  errors,
  errorText,
  required: requiredProp,
  disabled,
  readOnly,
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

  const required: boolean | undefined = !disableLabel && !(disabled || readOnly) && requiredProp;

  useEffect(() => {
    if (errors && errors[name]) {
      setHelperMessage(errorText ?? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.`);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  return (
    <FormControl
      id={`params-${name}`}
      variant={variant}
      size={size}
      required={required}
      disabled={disabled}
      sx={sx}
      fullWidth>
      {!disableLabel && (
        <FormLabel component="legend">
          {label}
        </FormLabel>
      )}
      <FormGroup row>
        {!disableAll && (
          <FormControlLabel
            label="전체"
            control={
              <Tooltip title={`${label} - 전체`}>
                <Checkbox
                  name={`${name}-all`}
                  readOnly={readOnly}
                  disabled={disabled}
                  checked={value && options.length === value.length}
                  onChange={() => {
                    if (value && options.length === value.length) {
                      setFieldValue(name, []);
                    } else {
                      setFieldValue(name, options.map(optionKey));
                    }
                  }} />
              </Tooltip>
            } />
        )}
        {options.map((option) => {
          const key = optionKey(option);
          return (
            <FormControlLabel
              key={key}
              label={optionText(option)}
              control={
                <Tooltip title={optionTooltip(option) ?? `${label} - ${optionText(option)}`}>
                  <Checkbox
                    name={name}
                    value={key}
                    readOnly={readOnly}
                    disabled={disabled}
                    checked={isChecked(option)}
                    onChange={() => {
                      if (isChecked(option) && value) {
                        setFieldValue(name, value.filter(item => item !== key));
                      } else {
                        setFieldValue(name, [...(value ?? []), optionKey(option)]);
                      }
                    }} />
                </Tooltip>
              } />
          );
        })}
      </FormGroup>
      {typeof errors[name] !== 'undefined' && (
        <FormHelperText error>
          {helperMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default CheckboxField;
