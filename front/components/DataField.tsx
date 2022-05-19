import React, { useEffect, useState } from 'react';
import {
  InputAdornment,
  MenuItem,
  TextField
} from '@mui/material';
import { FormikValues, FormikErrors } from 'formik';
import { Tooltip } from 'components';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';
import { toAmount, toAmountKor } from 'util/NumberUtil';

export type DataFieldValue = string | number;

export type Option = {
  key: DataFieldValue;
  text: DataFieldValue;
  tooltip?: string;
}

export type DataFieldProps = {
  type?: 'select' | 'amount' | 'number' | 'text' | 'password';
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
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
  disableLabel?: boolean;
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

export const optionTooltip = (option: Option | DataFieldValue): string | undefined => {
  if (typeof option === 'string' || typeof option === 'number') {
    return undefined;
  }
  const item: Option = option as Option;
  return item.tooltip;
};

const DataField = ({
  type = 'text',
  variant = 'standard',
  name,
  label,
  placeholder,
  tooltip,
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
  size,
  disableLabel
}: DataFieldProps) => {

  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(errors[name]);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

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
      setAmount(undefined);
      setAmountKor(undefined);
    }
  }, [value]);

  useEffect(() => {
    if (type === 'amount' && typeof amount === 'number') {
      setAmountKor(toAmountKor(amount));
    }
  }, [amount]);

  useEffect(() => {
    if (type === 'amount' && typeof amountKor === 'string' && amountKor !== '일금원') {
      setHelperMessage(amountKor);
    } else if (typeof amountKor === 'undefined') {
      setHelperMessage(helperText);
    }
  }, [amountKor]);

  return (
    <Tooltip
      title={
        disabled === true
          ? label
          : (tooltip ?? placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)
      }
      open={mouseEnter && viewValue !== '' && type !== 'select'}
      placement="bottom-start"
    >
      <TextField
        type={type === 'amount' ? 'string' : type}
        select={type === 'select' || undefined}
        variant={variant}
        size={size}
        id={`params-${name}`}
        name={name}
        value={viewValue}
        label={disableLabel ? undefined : label}
        onChange={(e) => {
          const rawValue = e.target.value ?? '';
          if (type === 'amount') {
            setAmount(toAmount(rawValue) || undefined);
          }
          setViewValue(rawValue);
        }}
        onMouseEnter={() => {
          setMouseEnter(true);
        }}
        onMouseLeave={() => {
          setMouseEnter(false);
        }}
        onBlur={() => {
          if (type === 'amount') {
            setViewValue(toAmount(viewValue).toLocaleString());
            setFieldValue(name, toAmount(viewValue));
          } else {
            setFieldValue(name, viewValue);
          }
        }}
        error={typeof errors[name] === 'string'}
        placeholder={disabled === true ? '' : (placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)}
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
    </Tooltip>
  );
};

export default DataField;
