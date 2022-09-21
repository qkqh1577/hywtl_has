import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useDataProps } from 'components/DataField';
import TextField, { TextFieldProps } from 'components/TextField';

export interface DateFieldProps
  extends TextFieldProps,
          Omit<DatePickerProps<Dayjs>,
            | 'value'
            | 'readOnly'
            | 'renderInput'
            | 'disabled'
            | 'label'
            | 'mask'
            | 'inputFormat'
            | 'allowSameDateSelection'
            | 'onChange'
            | 'onError'
            | 'inputRef'> {
  month?: boolean;
}

export default function DateField(props: DateFieldProps) {

  const {
          cancelText = '취소',
          clearText  = '초기화',
          openTo,
          okText     = '적용',
          month,
          name,
          label,
          status,
          helperText,
          required,
          endAdornment,
          startAdornment,
          disableLabel,
          labelWidth,
          labelPosition,
          labelSX,
          ...rest
        } = props;
  const {
          value,
          disabled,
          readOnly,
          formik
        } = useDataProps(props);
  const mask = month ? '____-__' : '____-__-__';

  const onError: DatePickerProps<Dayjs>['onError'] = (reason) => {
    switch (reason) {
      case 'invalidDate':
        formik.setErrors({
          ...formik.errors,
          [name]: '잘못된 형식의 날짜입니다.',
        });
        break;
      case 'shouldDisableDate':
        formik.setErrors({
          ...formik.errors,
          [name]: 'shouldDisableDate.',
        });
        break;
      case 'disableFuture':
        formik.setErrors({
          ...formik.errors,
          [name]: '오늘 이후 날짜를 선택할 수 없습니다.',
        });
        break;
      case 'disablePast' :
        formik.setErrors({
          ...formik.errors,
          [name]: '오늘 이전 날짜를 선택할 수 없습니다.',
        });
        break;
      case 'minDate' :
        formik.setErrors({
          ...formik.errors,
          [name]: '기준 이전 날짜를 선택할 수 없습니다.',
        });
        break;
      case 'maxDate':
        formik.setErrors({
          ...formik.errors,
          [name]: '기준 이후 날짜를 선택할 수 없습니다.',
        });
        break;
      default:
        formik.setErrors({
          ...formik.errors,
          [name]: undefined,
        });
    }
  };

  const onChange: DatePickerProps<Dayjs>['onChange'] = (date) => {
    console.log(date);
    if (!value && !date) {
      return;
    }
    if (value && dayjs(value)
    .format('YYYY-MM-DD') === dayjs(date)
    .format('YYYY-MM-DD')) {
      return;
    }
    formik.setFieldValue(name, dayjs(date)
    .format('YYYY-MM-DD'));
  };

  const renderInput: DatePickerProps<Dayjs>['renderInput'] = (parameter) => {

    return (
      <TextField
        status={status}
        helperText={helperText}
        required={required}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        disableLabel={disableLabel}
        labelWidth={labelWidth}
        labelPosition={labelPosition}
        labelSX={labelSX}
        {...parameter}
        name={name}
        label={label}
      />
    );
  };

  return (
    <DatePicker
      {...rest}
      allowSameDateSelection
      mask={mask}
      inputFormat={month ? 'YYYY-MM' : 'YYYY-MM-DD'}
      value={value ?? null}
      onChange={onChange}
      onError={onError}
      renderInput={renderInput}
      disabled={disabled}
      readOnly={readOnly}
      cancelText={cancelText}
      clearText={clearText}
      openTo={month ? 'month' : (openTo ?? 'day')}
      okText={okText}
    />
  );
}