import React from 'react';
import { TextField } from '@mui/material';
import { DatePickerProps, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { FieldProps } from 'formik';

interface Props extends FieldProps, DatePickerProps {
  placeholder?: string;
}

const DatePicker = ({
  form,
  field: { name },
  value,
  label,
  placeholder,
  onError,
  onChange,
  renderInput,
  ...props
}: Props) => {
  const {
    setFieldValue,
    setFieldError,
    setErrors,
    errors,
    touched
  } = form;
  const currentError = errors[name];
  const toShowError = Boolean(currentError && touched[name]);
  // TODO: 에러 메세지 처리
  return (
    <MuiDatePicker
      mask="____-__-__"
      inputFormat="YYYY-MM-DD"
      toolbarFormat="YYYY-MM-DD"
      okText="적용"
      value={value}
      onChange={onChange}
      onError={(reason) => {
        switch (reason) {
          case 'invalidDate':
            setFieldError('basic.birthDate', '날짜 유형(YYYY-MM-DD)이 올바르지 않습니다.');
            break;
          case 'disableFuture':
            setFieldError('basic.birthDate', '미래 날짜는 넣을 수 없습니다.');
            break;
          default:
            setErrors({
              ...errors,
              [name]: undefined,
            });
        }
      }}
      renderInput={({ InputProps, ...params }) => (
        <TextField
          {...params}
          variant="standard"
          fullWidth
          name={name}
          label={label}
          error={toShowError}
          InputProps={{
            ...InputProps,
            id: `params-${name}`,
            type: 'text',
            name,
            placeholder,
          }}
        >
        </TextField>
      )}
      {...props}
    />
  );
};

export default DatePicker;
