import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { CalendarPickerView } from '@mui/x-date-pickers/internals/models';
import dayjs from 'dayjs';
import { ErrorMessage } from 'formik';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

type Props = {
  value: Date | null;
  name: string;
  label: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  required?: boolean;
  format?: string;
  openTo?: CalendarPickerView;
  disableFuture?: boolean;
}

const DatePicker = ({
  name,
  label,
  value,
  setFieldValue,
  required,
  format = 'YYYY-MM-DD',
  openTo = 'day',
  disableFuture
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const placeholder: string = `${label}(${format})${getObjectPostPosition(label)} 입력하세요`;
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
          helperText={error ?? <ErrorMessage name={name} />}
          placeholder={placeholder}
          variant="standard"
          required={required === true}
          fullWidth
        >
        </TextField>
      )}
      allowSameDateSelection
      disableFuture={disableFuture === true}
    />
  );
};

export default DatePicker;
