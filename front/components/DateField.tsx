import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';
import {
  TextField,
  TextFieldProps
} from '@mui/material';
import { FieldStatus, } from 'components/DataFieldProps';
import { FormikContextType, } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { useDataProps } from 'components/DataField';

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
    | 'onError'>,
          Pick<TextFieldProps,
            | 'required'
            | 'onChange'
            | 'helperText'
            | 'onBlur'> {
  name: string;
  label: string;
  disableLabel?: boolean;
  status?: FieldStatus;
  formikContext?: FormikContextType<any>;
}

export default function DateField(props: DateFieldProps) {

  const {
          cancelText = '취소',
          clearText  = '초기화',
          openTo     = 'day',
          okText     = '적용',
          name,
          disableLabel,
          status,
          required:   propsRequired,
          label:      propsLabel,
          helperText: propsHelperText,
          ...         rest
        } = props;
  const {
          error,
          value,
          disabled,
          readOnly,
          required,
          helperText,
          label,
          edit,
          formik,
        } = useDataProps(props);

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
    formik.setFieldValue(name, date);
  };

  const renderInput: DatePickerProps<Dayjs>['renderInput'] = (parameter) => {

    return (
      <TextField
        {...parameter}
        fullWidth
        variant="standard"
        name={name}
        required={edit && required}
        label={disableLabel ? undefined : label}
        error={error}
        helperText={helperText}
        InputProps={{
          ...parameter.InputProps,
          readOnly,
        }}
        onBlur={() => {
          if (props.onChange) {
            props.onChange(typeof value === 'string'
              ? dayjs(value)
              .toDate()
              : value?.toDate()
            );
          }
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