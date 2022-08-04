import { DatePicker } from '@mui/x-date-pickers';
import React, {
  useMemo,
} from 'react';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';
import { TextField } from '@mui/material';
import {
  FieldStatus,
  FieldValue
} from 'components/DataFieldProps';
import {
  FormikValues,
  useFormikContext
} from 'formik';
import { Dayjs } from 'dayjs';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';

export interface DateFieldProps
  extends Omit<DatePickerProps<Dayjs>,
    | 'value'
    | 'readOnly'
    | 'renderInput'
    | 'disabled'
    | 'label'
    | 'mask'
    | 'inputFormat'
    | 'allowSameDateSelection'
    | 'onChange'
    | 'onError'> {
  required?: boolean;
  name: string;
  label: string;
  disableLabel?: boolean;
  helperText?: string;
  status?: FieldStatus;
}

export default function DateField(props: DateFieldProps) {

  const {
          cancelText = '취소',
          clearText  = '초기화',
          openTo     = 'day',
          okText     = '적용',
          name,
          label,
          disableLabel,
          helperText,
          status,
          required,
          ...rest
        } = props;
  const { values, errors, setErrors, setFieldValue } = useFormikContext<FormikValues>();
  const error = useMemo(() => !!errors[name], [errors]);
  const {
          value,
          edit
        } = useMemo<FieldValue<Dayjs>>(() => ({
    value: values[name] ?? '',
    edit:  values.edit !== false
  }), [values]);
  const {
          disabled,
          readOnly
        } = useMemo(() => ({
    disabled: status === FieldStatus.Disabled,
    readOnly: status === FieldStatus.ReadOnly || edit,
  }), [status, edit]);

  const onError: DatePickerProps<Dayjs>['onError'] = (reason) => {
    switch (reason) {
      case 'invalidDate':
        setErrors({
          ...errors,
          [name]: '잘못된 형식의 날짜입니다.',
        });
        break;
      case 'shouldDisableDate':
        setErrors({
          ...errors,
          [name]: 'shouldDisableDate.',
        });
        break;
      case 'disableFuture':
        setErrors({
          ...errors,
          [name]: '오늘 이후 날짜를 선택할 수 없습니다.',
        });
        break;
      case 'disablePast' :
        setErrors({
          ...errors,
          [name]: '오늘 이전 날짜를 선택할 수 없습니다.',
        });
        break;
      case 'minDate' :
        setErrors({
          ...errors,
          [name]: '기준 이전 날짜를 선택할 수 없습니다.',
        });
        break;
      case 'maxDate':
        setErrors({
          ...errors,
          [name]: '기준 이후 날짜를 선택할 수 없습니다.',
        });
        break;
      default:
        setErrors({
          ...errors,
          [name]: undefined,
        });
    }
  };


  const onChange: DatePickerProps<Dayjs>['onChange'] = (date) => {
    setFieldValue(name, date);
  };

  const renderInput: DatePickerProps<Dayjs>['renderInput'] = (params) => {

    return (
      <TextField
        {...params}
        fullWidth
        variant="standard"
        name={name}
        required={edit && required}
        label={disableLabel ? undefined : label}
        error={error}
        helperText={error ? errors[name] ?? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText}
        InputProps={{
          ...params.InputProps,
          readOnly,
        }}
      />
    );
  };

  return (
    <DatePicker
      {...rest}
      allowSameDateSelection
      mask="____-__-__"
      inputFormat="YYYY-MM-DD"
      value={value ?? null}
      onChange={onChange}
      onError={onError}
      renderInput={renderInput}
      disabled={disabled}
      readOnly={readOnly}
      cancelText={cancelText}
      clearText={clearText}
      openTo={openTo}
      okText={okText}
    />
  );
}