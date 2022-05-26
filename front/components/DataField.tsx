import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  InputAdornment,
  MenuItem,
  TextField, TextFieldProps
} from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { FormikValues, FormikErrors } from 'formik';
import { Tooltip as CustomTooltip } from 'components';
import { getObjectPostPosition, getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { toAmount, toAmountKor } from 'util/NumberUtil';

export type DataFieldValue = string | number;

export interface Option {
  key: DataFieldValue;
  text: DataFieldValue;
  tooltip?: string;
}

export interface Props {
  autoFocus?: boolean;
  disableLabel?: boolean;
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  errorText?: string;
  errors: FormikErrors<FormikValues>;
  helperText?: string | React.ReactNode;
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SyntheticEvent, value?: DataFieldValue) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  size?: 'small';
  sx?: SxProps<Theme>;
  tooltip?: string;
  type?: 'select' | 'amount' | 'number' | 'text' | 'password';
  value: DataFieldValue | DataFieldValue[] | '';
  variant?: 'standard' | 'filled' | 'outlined';
}

export interface SelectProps extends Props {
  options: Option[] | DataFieldValue[];
  type: 'select';
  multiple?: boolean;
}

export interface InputProps extends Props {
  type?: 'number' | 'text' | 'password';
  value: DataFieldValue | '';
}

const isSelect = (props: Props): props is SelectProps => {
  return props.type === 'select';
};

const isInput = (props: Props): props is InputProps => {
  return typeof props.type === 'undefined'
    || props.type === 'number'
    || props.type === 'text'
    || props.type === 'password';
};

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

const Tooltip = (props: {
  open?: boolean;
  title: string;
  children: React.ReactElement;
}) => (
  <CustomTooltip
    {...props}
    placement="bottom-start"
    sx={{
      display: 'flex',
      width: '100%',
    }}
  />
);

interface InputFieldProps extends Pick<TextFieldProps,
  'InputProps'
  | 'autoFocus'
  | 'disabled'
  | 'error'
  | 'helperText'
  | 'id'
  | 'label'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'placeholder'
  | 'required'
  | 'size'
  | 'sx'
  | 'type'
  | 'variant'> {
  value: DataFieldValue | '';
  tooltip: string;
  openTooltip?: boolean;
}

const InputField = ({
  tooltip,
  openTooltip,
  ...rest
}: InputFieldProps) => (
  <Tooltip open={openTooltip} title={tooltip}>
    <TextField fullWidth {...rest} />
  </Tooltip>
);

const DataField = (props: Props) => {
  const {
    name,
    label,
    errors,
  } = props;

  const required: boolean | undefined
    = !props.disableLabel
    && !(props.disabled || props.readOnly)
    && props.required;
  const isError: boolean = !!(errors && errors[name]);
  const helperText: React.ReactNode
    = isError
    ? props.errorText ?? `${label}${getAuxiliaryPostPosition(props.label)} 필수 항목입니다.`
    : props.helperText;

  const [mouseEnter, setMouseEnter] = useState<boolean>(false);

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
      open={mouseEnter && viewValue !== '' && type !== 'select'}
      title={
        disabled || readOnly
          ? label
          : (tooltip ?? placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)
      }
    >
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