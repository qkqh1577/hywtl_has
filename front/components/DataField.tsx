import React, { useEffect, useState } from 'react';
import {
  InputAdornment, MenuItem,
  TextField
} from '@mui/material';
import { ErrorMessage, FormikValues, FormikErrors } from 'formik';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';
import { toAmount, toAmountKor } from 'util/NumberUtil';

export type DataFieldValue = string | number;

export type Option = {
  key: DataFieldValue;
  text: DataFieldValue;
}

export type DataFieldProps = {
  type?: 'select' | 'amount' | 'number' | 'text' | 'password';
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  placeholder?: string;
  value: DataFieldValue | '';
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>;
  required?: boolean;
  disabled?: boolean;
  options?: Option[] | DataFieldValue[];
  helperText?: string | React.ReactNode;
  sx?: any;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  size?: 'small';
}
export const optionKey = (option: Option | DataFieldValue): DataFieldValue => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option as DataFieldValue;
  }
  const item: Option = option as Option;
  return item.key;
};

export const optionText = (option: Option | DataFieldValue): DataFieldValue => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option as DataFieldValue;
  }
  const item: Option = option as Option;
  return item.text;
};

const DataField = ({
  type = 'text',
  variant = 'standard',
  name,
  label,
  placeholder,
  value,
  setFieldValue,
  errors,
  required,
  disabled,
  helperText,
  options,
  sx,
  onFocus,
  onKeyDown,
  onKeyUp,
  size
}: DataFieldProps) => {

  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(<ErrorMessage name={name} />);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  const [rawValue, setRawValue] = useState<DataFieldValue>(value);
  const [viewValue, setViewValue] = useState<DataFieldValue>(value);
  const [amount, setAmount] = useState<number | undefined>();
  const [amountKor, setAmountKor] = useState<string | undefined>();

  useEffect(() => {
    if (type === 'amount' && typeof value === 'number') {
      const amount = value as number;
      setAmount(amount);
      setViewValue(amount.toLocaleString());
    } else {
      setViewValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (type === 'amount') {
      setRawValue(toAmount(viewValue));
    } else {
      setRawValue(viewValue);
    }
  }, [viewValue]);

  useEffect(() => {
    setFieldValue(name, rawValue);
  }, [rawValue]);

  useEffect(() => {
    if (type === 'amount' && typeof amount === 'number') {
      setAmountKor(toAmountKor(amount));
    }
  }, [amount]);

  useEffect(() => {
    if (type === 'amount' && typeof amountKor === 'string' && amountKor !== '일금원') {
      setHelperMessage(amountKor);
    }
  }, [amountKor]);

  return (
    <TextField
      type={type === 'amount' ? 'string' : type}
      select={type === 'select' || undefined}
      variant={variant}
      size={size}
      id={`params-${name}`}
      name={name}
      value={viewValue}
      label={label}
      onChange={(e) => {
        setViewValue(e.target.value);
      }}
      error={typeof errors[name] === 'string'}
      placeholder={placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`}
      helperText={helperMessage}
      required={!(disabled === true) && required === true}
      disabled={disabled === true}
      sx={sx}
      InputProps={type !== 'select' ? {
        onFocus,
        onKeyDown,
        onKeyUp,
        startAdornment: type === 'amount'
          ? <InputAdornment position="start">₩</InputAdornment>
          : undefined,
      } : undefined}
      fullWidth
    >
      {type === 'select' && options && options
      .map((item) => (
        <MenuItem key={optionKey(item)} value={optionKey(item)}>
          {optionText(item)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DataField;
