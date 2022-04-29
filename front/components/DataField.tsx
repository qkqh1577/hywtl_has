import React, { useEffect, useState } from 'react';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { ErrorMessage, FormikValues, FormikErrors } from 'formik';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

export type DataFieldValue = string | number;

type Option = {
  key: DataFieldValue;
  value: DataFieldValue;
}

export type DataFieldProps = {
  type?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  placeholder?: string;
  value: DataFieldValue | '';
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>,
  required?: boolean;
  disabled?: boolean;
  options?: Option[] | DataFieldValue[];
  helperText?: string | React.ReactNode;
  sx?: any;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  InputProps?: Partial<OutlinedInputProps>;
  size?: 'small';
}

const getAmount = (localeString: DataFieldValue): number | '' => {
  if (typeof localeString === 'number' || localeString === '') {
    return '';
  }
  const builder: string[] = [];
  for (let i = 0; i < localeString.length; i++) {
    const letter: string = localeString[i];
    if (i === 0 && letter === '-') {
      builder.push(letter);
      continue;
    }
    if (letter === ' ' || letter === ',') {
      continue;
    }
    if (Number.isNaN(+letter)) {
      continue;
    }
    builder.push(letter);
  }

  if (builder.length === 0) {
    return '';
  }
  const raw: string = builder.join('');
  if (Number.isNaN(+raw)) {
    return '';
  }
  return +raw;
};

const getAmountKor = (amount: number | ''): string | undefined => {
  if (amount === '' || amount < 0) {
    return;
  }
  const releaseBuilder = (builder: string): string =>
    `일금${builder}원정`;
  const counter: string[] = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const splitter: string[] = ['', '십', '백', '천'];
  const unit: string[] = ['', '만', '억', '조', '경', '해'];

  const amountStr = `${amount}`;

  let breaker: boolean = false;
  let result: string = '';

  if (amountStr === '0') {
    return releaseBuilder('영');
  }
  for (let i = 0; ; i++) {
    let unitUsed: boolean = false;
    for (let j = 0; j < splitter.length; j++) {
      const index = i * splitter.length + j;
      if (index === amountStr.length) {
        breaker = true;
        break;
      }
      const letter: string = amountStr[amountStr.length - 1 - index];
      if (letter === '0') {
        continue;
      }
      if (letter === '-') {
        continue;
      }
      let str: string = counter[+letter];
      str += splitter[j];
      if (!unitUsed) {
        if (i < unit.length) {
          str += unit[i];
          unitUsed = true;
        }
        result = str + result;
      }
      if (breaker) {
        break;
      }
    }
    if (breaker) {
      break;
    }
  }
  return releaseBuilder(result);
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
  options,
  helperText,
  sx,
  InputProps,
  onFocus,
  onKeyDown,
  onKeyUp,
  size
}: DataFieldProps) => {
  const [rawValue, setRawValue] = useState<DataFieldValue>(value);
  const [viewValue, setViewValue] = useState<DataFieldValue>(value);
  const [amount, setAmount] = useState<number | undefined>();
  const [amountKor, setAmountKor] = useState<string | undefined>();
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);

  useEffect(() => {
    if (typeof value === 'number') {
      if (type === 'amount') {
        setAmount(value);
        setViewValue((value as number).toLocaleString());
      }
    } else {
      setViewValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (type === 'amount') {
      setRawValue(getAmount(viewValue));
    } else {
      setRawValue(viewValue);
    }
  }, [viewValue]);

  useEffect(() => {
    setFieldValue(name, rawValue);
  }, [rawValue]);

  useEffect(() => {
    if (type === 'amount' && typeof amount === 'number') {
      setAmountKor(getAmountKor(amount));
    }
  }, [amount]);

  useEffect(() => {
    setHelperMessage(amountKor);
  }, [amountKor]);

  return (
    <TextField
      type={type === 'amount' ? 'string' : type}
      variant={variant}
      size={size}
      select={type === 'select' ? true : undefined}
      id={`params-${name}`}
      name={name}
      value={viewValue}
      label={label}
      onChange={(e) => {
        setViewValue(e.target.value);
      }}
      error={typeof errors[name] === 'string'}
      onError={() => {
        setHelperMessage(<ErrorMessage name={name} />);
      }}
      placeholder={placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`}
      helperText={helperMessage}
      required={!(disabled === true) && required === true}
      disabled={disabled === true}
      sx={sx}
      InputProps={{
        ...InputProps,
        onFocus,
        onKeyDown,
        onKeyUp,
        startAdornment: type === 'amount'
          ? <InputAdornment position="start">₩</InputAdornment>
          : undefined,
      }}
      fullWidth
    >
      {type === 'select' && options && options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          const item: DataFieldValue = option as DataFieldValue;
          return <MenuItem key={item} value={item}>{item}</MenuItem>;
        }
        const item: Option = option as Option;
        return <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>;
      })}
    </TextField>
  );
};

export default DataField;
