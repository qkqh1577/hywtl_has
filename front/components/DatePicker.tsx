import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { CalendarPickerView } from '@mui/x-date-pickers/internals/models';
import dayjs from 'dayjs';
import { ErrorMessage, FormikErrors, FormikValues } from 'formik';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

type Props = {
  value: Date | null;
  name: string;
  label: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>;
  required?: boolean;
  disabled?: boolean;
  format?: string;
  openTo?: CalendarPickerView;
  disableFuture?: boolean;
  placeholder?: string;
  helperText?: string | React.ReactNode;
}

const DatePicker = ({
  name,
  label,
  value,
  setFieldValue,
  errors,
  required,
  disabled,
  format = 'YYYY-MM-DD',
  openTo = 'day',
  disableFuture,
  placeholder,
  helperText,
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);

  return (
    <MuiDatePicker
      mask="____-__-__"
      okText="적용"
      inputFormat={format}
      toolbarFormat={format}
      value={value}
      openTo={openTo}
      onChange={(date) => {
        setFieldValue(name, date);
        if (helperMessage !== helperText) {
          setHelperMessage(helperText);
        }
      }}
      onError={(reason) => {
        switch (reason) {
          case 'invalidDate':
            setError(`날짜 유형(${format})이 올바르지 않습니다.`);
            break;
          case 'disableFuture':
            setError('미래 날짜는 넣을 수 없습니다.');
            break;
          default:
            setError(undefined);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id={`params-${name}`}
          name={name}
          value={value === null ? '' : dayjs(value).format(format)}
          label={label}
          helperText={helperMessage}
          placeholder={placeholder ?? `${label}(${format})${getObjectPostPosition(label)} 입력해 주세요`}
          variant="standard"
          required={required === true}
          error={typeof errors[name] === 'string' || typeof error === 'string'}
          onError={() => {
            setHelperMessage(<ErrorMessage name={name} />);
          }}
          fullWidth
        >
        </TextField>
      )}
      allowSameDateSelection
      disableFuture={disableFuture === true}
      disabled={disabled === true}
    />
  );
};

export default DatePicker;
