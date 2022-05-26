import React, { useEffect, useState } from 'react';
import {
  InputAdornment,
  MenuItem,
  TextField
} from '@mui/material';
import { FormikValues, FormikErrors } from 'formik';
import { Tooltip } from 'components';
import { getObjectPostPosition, getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { toAmount, toAmountKor } from 'util/NumberUtil';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

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
  errorText?: string;
  helperText?: string | React.ReactNode;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  options?: Option[] | DataFieldValue[];
  endAdornment?: React.ReactNode;
  sx?: SxProps<Theme>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value?: DataFieldValue) => void;
  size?: 'small';
  disableLabel?: boolean;
  autoFocus?: boolean;
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
  errorText,
  helperText,
  disabled,
  readOnly,
  required: requiredProp,
  endAdornment,
  options,
  sx,
  onFocus,
  onKeyDown,
  onKeyUp,
  onChange,
  size,
  disableLabel,
  autoFocus,
}: DataFieldProps) => {

  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  useEffect(() => {
    if (errors && errors[name]) {
      setHelperMessage(errorText ?? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.`);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors, helperText]);

  const [viewValue, setViewValue] = useState<DataFieldValue>(value);
  const [amount, setAmount] = useState<number | undefined>();
  const [amountKor, setAmountKor] = useState<string | undefined>();

  const required: boolean | undefined = !disableLabel && !(disabled || readOnly) && requiredProp;

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
      open={mouseEnter && viewValue !== '' && type !== 'select'}
      placement="bottom-start"
      title={
        disabled || readOnly
          ? label
          : (tooltip ?? placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)
      }
      sx={{
        display: 'flex',
        width: '100%',
      }}>
      <TextField fullWidth
        type={type === 'amount' ? 'string' : type}
        select={type === 'select' || undefined}
        variant={variant}
        size={size}
        id={`params-${name}`}
        name={name}
        value={viewValue}
        label={disableLabel ? undefined : label}
        autoFocus={autoFocus}
        error={typeof errors[name] !== 'undefined'}
        placeholder={disabled || readOnly ? '' : (placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)}
        helperText={helperMessage}
        required={required}
        disabled={disabled}
        sx={sx}
        InputProps={{
          onFocus,
          onKeyUp,
          readOnly,
          onKeyDown: (e) => {
            setMouseEnter(false);
            if (e.key.toLowerCase() === 'enter') {
              if (type === 'amount') {
                setViewValue(toAmount(viewValue).toLocaleString());
                setFieldValue(name, toAmount(viewValue));
              } else {
                setFieldValue(name, viewValue);
              }
            }
            if (onKeyDown) {
              onKeyDown(e);
            }
          },
          endAdornment: endAdornment ? (
            <InputAdornment position="end">
              {endAdornment}
            </InputAdornment>
          ) : undefined,
          startAdornment: type === 'amount'
            ? <InputAdornment position="start">₩</InputAdornment>
            : undefined,
        }}
        onChange={(e) => {
          const rawValue = e.target.value ?? '';
          if (type === 'amount') {
            setAmount(toAmount(rawValue) || undefined);
          }
          if (type === 'select') {
            setFieldValue(name, rawValue);
          } else {
            setViewValue(rawValue);
          }
          if (onChange) {
            onChange(e, rawValue);
          }
        }}
        onMouseEnter={() => {
          setMouseEnter(true);
        }}
        onMouseLeave={() => {
          setMouseEnter(false);
        }}
        onBlur={() => {
          setMouseEnter(false);
          if (type !== 'select') {
            if (type === 'amount') {
              setViewValue(toAmount(viewValue).toLocaleString());
              setFieldValue(name, toAmount(viewValue));
            } else {
              setFieldValue(name, viewValue);
            }
          }
        }}>
        {type === 'select' && options && options.map((item) => (
          <MenuItem
            key={optionKey(item)}
            value={optionKey(item)}
          >
            {optionText(item)}
          </MenuItem>
        ))}
      </TextField>
    </Tooltip>
  );
};

export default DataField;