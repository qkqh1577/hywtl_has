import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { CalendarPickerView } from '@mui/x-date-pickers/internals/models';
import dayjs from 'dayjs';
import { FormikErrors, FormikValues } from 'formik';
import { Tooltip } from 'components';
import { getAuxiliaryPostPosition, getObjectPostPosition } from 'util/KoreanLetterUtil';

type Props = {
  value: Date | null;
  name: string;
  label: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  format?: string;
  openTo?: CalendarPickerView;
  disableFuture?: boolean;
  placeholder?: string;
  helperText?: string | React.ReactNode;
  disableLabel?: boolean;
}

const DatePicker = ({
  name,
  label,
  value,
  setFieldValue,
  errors,
  errorText,
  required: requiredProp,
  disabled,
  readOnly,
  format = 'YYYY-MM-DD',
  openTo = 'day',
  disableFuture,
  placeholder,
  helperText,
  disableLabel
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);

  const required: boolean | undefined = !disableLabel && !(disabled || readOnly) && requiredProp;

  useEffect(() => {
    if (errors && errors[name]) {
      setError(errorText ?? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.`);
    } else if (helperMessage !== helperText) {
      setError(undefined);
    }
  }, [errors]);

  return (
    <MuiDatePicker allowSameDateSelection
      mask="____-__-__"
      okText="적용"
      inputFormat={format}
      toolbarFormat={format}
      value={value}
      openTo={openTo}
      disableFuture={disableFuture}
      disabled={disabled}
      readOnly={readOnly}
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
        <Tooltip
          placement="bottom-end"
          title={
            disabled || readOnly
              ? label
              : (placeholder ?? `${label}(${format})${getObjectPostPosition(label)} 입력해 주세요`)
          }
        >
          <TextField fullWidth
            {...params}
            variant="standard"
            id={`params-${name}`}
            name={name}
            value={value === null ? '' : dayjs(value).format(format)}
            label={disableLabel ? undefined : label}
            helperText={helperMessage}
            placeholder={placeholder ?? `${label}(${format})${getObjectPostPosition(label)} 입력해 주세요`}
            required={required}
            error={typeof errors[name] !== 'undefined'}
            onError={() => {
              setHelperMessage(error);
            }}
          />
        </Tooltip>
      )}
    />
  );
};

export default DatePicker;
