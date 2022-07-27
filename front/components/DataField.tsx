import React, {
  useState
} from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material';
import {
  CheckboxProps,
  CommonProps,
  DataFieldValue,
  DateProps,
  Option,
  isCheckbox,
  isDate,
  isOption,
} from 'components';
import {
  getObjectPostPosition,
  getAuxiliaryPostPosition
} from 'util/KoreanLetterUtil';
import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';
import {
  FormikValues,
  useFormikContext
} from 'formik';

const DataField = (props:  CheckboxProps | DateProps) => {
  const {
          autoFocus,
          disableLabel,
          disabled,
          helperText,
          label,
          name,
          placeholder,
          readOnly,
          required,
          size,
          sx,
          variant = 'standard',
        } = props;

  const { values, errors, setFieldValue } = useFormikContext<FormikValues>();
  const value = values[name];

  const error: boolean | undefined = errors && typeof errors[name] !== 'undefined' ? true : undefined;
  const editable: boolean = !(disabled || readOnly);
  const defaultPlaceholder = (placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`);
  const commonProps: CommonProps = {
    autoFocus,
    disabled,
    error,
    name,
    size,
    sx,
    variant,
    id:          `params-${name}`,
    label:       disableLabel ? undefined : label,
    required:    !disableLabel && editable && required,
    helperText:  error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText,
    placeholder: editable ? defaultPlaceholder : undefined,
  };

  if (isCheckbox(props)) {
    const {
            allText = '전체',
            disableAll,
          } = props;

    const options = props.options?.map(option => isOption(option) ? option : {
      key:  option,
      text: option
    }) ?? [];

    const isChecked = (option: Option): boolean => value.includes(option.key);
    const isCheckboxValue = (value: any): value is DataFieldValue[] => {
      return Array.isArray(value);
    };

    return (
      <FormControl fullWidth
        id={commonProps.id}
        variant={variant}
        size={size}
        required={commonProps.required}
        disabled={commonProps.disabled}
        sx={commonProps.sx}
      >
        {!disableLabel && (
          <FormLabel component="legend">
            {label}
          </FormLabel>
        )}
        <FormGroup row>
          {!disableAll && (
            <FormControlLabel
              label={allText}
              control={
                <Checkbox
                  readOnly={readOnly}
                  disabled={disabled}
                  checked={value && options.length === value.length}
                  onChange={() => {
                    if (value && options.length === value.length) {
                      setFieldValue(name, []);
                    }
                    else {
                      setFieldValue(name, options.map(option => option.key));
                    }
                  }}
                />
              }
            />
          )}
          {options.map((option,
                        i
          ) => (
            <FormControlLabel
              key={i}
              label={`${option.text}`}
              control={
                <Checkbox
                  name={name}
                  value={option.key}
                  readOnly={readOnly}
                  disabled={disabled}
                  checked={isChecked(option)}
                  onChange={() => {
                    if (isChecked(option) && isCheckboxValue(value)) {
                      setFieldValue(name, value.filter(item => item !== option.key));
                    }
                    else {
                      setFieldValue(name, [...value, option.key]);
                    }
                  }}
                />
              }
            />
          ))}
        </FormGroup>
        {commonProps.error && (
          <FormHelperText error>
            {commonProps.helperText}
          </FormHelperText>
        )}
      </FormControl>
    );

  } // end of CheckboxProps

  if (isDate(props)) {
    const {
            mask       = '____-__-__',
            cancelText = '취소',
            clearText  = '초기화',
            format     = 'YYYY-MM-DD',
            openTo     = 'day',
            okText     = '적용',
            inputFormat,
            toolbarFormat,
            clearable,
            disableCloseOnSelect,
            disableFuture,
            disableHighlightToday,
            disableOpenPicker,
            disablePast,
            maxDate,
            minDate,
            onAccept,
            onClose,
            onMonthChange,
            onOpen,
            onViewChange,
            onYearChange,
            showDaysOutsideCurrentMonth,
            showTodayButton,
            showToolbar,
            todayText,
            toolbarPlaceholder,
            toolbarTitle,
          } = props;


    const [errorText, setErrorText] = useState<React.ReactNode>(commonProps.error ? commonProps.helperText : undefined);

    const dateProps: Pick<DatePickerProps,
      'cancelText'
      | 'clearText'
      | 'clearable'
      | 'disableCloseOnSelect'
      | 'disableFuture'
      | 'disableHighlightToday'
      | 'disableOpenPicker'
      | 'disablePast'
      | 'disabled'
      | 'inputFormat'
      | 'mask'
      | 'maxDate'
      | 'minDate'
      | 'okText'
      | 'onAccept'
      | 'onChange'
      | 'onClose'
      | 'onError'
      | 'onMonthChange'
      | 'onOpen'
      | 'onViewChange'
      | 'onYearChange'
      | 'openTo'
      | 'readOnly'
      | 'renderInput'
      | 'showDaysOutsideCurrentMonth'
      | 'showTodayButton'
      | 'showToolbar'
      | 'todayText'
      | 'toolbarFormat'
      | 'toolbarPlaceholder'
      | 'toolbarTitle'> = {
      cancelText,
      clearText,
      clearable:     editable && clearable,
      disableCloseOnSelect,
      disableFuture,
      disableHighlightToday,
      disableOpenPicker,
      disablePast,
      disabled,
      mask,
      maxDate,
      minDate,
      okText,
      onAccept,
      onClose,
      onMonthChange,
      onOpen,
      onViewChange,
      onYearChange,
      openTo,
      readOnly,
      showDaysOutsideCurrentMonth,
      showTodayButton,
      showToolbar,
      todayText,
      toolbarPlaceholder,
      toolbarTitle,
      inputFormat:   inputFormat ?? format,
      toolbarFormat: toolbarFormat ?? format,
      onChange:      (date) => {
        setFieldValue(name, date ?? '');
      },
      onError:       (reason) => {
        switch (reason) {
          case 'invalidDate':
            setErrorText(`날짜 유형(${format})이 올바르지 않습니다.`);
            break;
          case 'disableFuture':
            setErrorText('미래 날짜는 넣을 수 없습니다.');
            break;
          default:
            setErrorText(undefined);
        }
      },
      renderInput:   (params) => (
        <TextField fullWidth
          {...params}
          helperText={errorText ?? commonProps.helperText}
        />
      )
    };

    return <DatePicker allowSameDateSelection
      value={value || null}
      {...commonProps}
      {...dateProps}
    />;
  } // end of DateProps

  return <>ERROR: type not declared.</>;
};

export default DataField;