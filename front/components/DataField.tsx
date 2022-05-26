import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material';
import {
  CloseRounded as CloseIcon,
} from '@mui/icons-material';
import {
  CheckboxProps,
  CommonProps,
  DataFieldValue,
  DateProps,
  InputProps,
  Option,
  SelectProps,
  Tooltip as CustomTooltip,
  isCheckbox,
  isDataFieldValue,
  isDate,
  isInput,
  isOption,
  isSelect,
} from 'components';
import { getObjectPostPosition, getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { toAmount, toAmountKor } from 'util/NumberUtil';
import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';

const Tooltip = (props: {
  title: string;
  open?: boolean;
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

const DataField = (props: InputProps | SelectProps | CheckboxProps | DateProps) => {
  const {
    autoFocus,
    disableLabel,
    disabled,
    errorText,
    helperText,
    label,
    name,
    placeholder,
    readOnly,
    required,
    size,
    sx,
    variant = 'standard',
    errors,
    setFieldValue,
  } = props;

  const [mouseEnter, setMouseEnter] = useState<boolean>(false);

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
    id: `params-${name}`,
    label: disableLabel ? undefined : label,
    required: !disableLabel && editable && required,
    helperText: error ? errorText ?? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText,
    placeholder: editable ? defaultPlaceholder : undefined,
  };

  if (isInput(props)) {
    const {
      endAdornment,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
      startAdornment,
      tooltip,
      type = 'text',
      value,
    } = props;
    const [viewValue, setViewValue] = useState<DataFieldValue>(value);
    const tooltipOpen = editable && mouseEnter && value !== '';
    const tooltipTitle = tooltip ?? defaultPlaceholder;
    const placeholder
      = type === 'amount' && !commonProps.error && typeof value === 'number'
      ? toAmountKor(value)
      : commonProps.placeholder;

    const fieldProps: Pick<TextFieldProps,
      'onBlur'
      | 'onFocus'
      | 'onKeyUp'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onChange'
      | 'InputProps'> = {
      onFocus: (e) => {
        setMouseEnter(false);
        if (onFocus) {
          onFocus(e);
        }
      },
      onMouseEnter: (e) => {
        setMouseEnter(true);
        if (onMouseEnter) {
          onMouseEnter(e);
        }
      },
      onMouseLeave: (e) => {
        setMouseEnter(false);
        if (onMouseLeave) {
          onMouseLeave(e);
        }
      },
      onChange: (e) => {
        const rawValue = e.target.value ?? '';
        setViewValue(rawValue);
        if (onChange) {
          onChange(e, type === 'amount' ? toAmount(rawValue) : rawValue);
        }
      },
      onBlur: (e) => {
        setMouseEnter(false);
        if (onBlur) {
          onBlur(e);
        }
      },
      InputProps: {
        onClick,
        onKeyUp,
        readOnly,
        startAdornment,
        endAdornment:
          <>
            {editable && (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                  setFieldValue(name, '');
                }}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )}
            {endAdornment && (
              <InputAdornment position="end" children={endAdornment} />
            )}
          </>,
        onKeyDown: (e) => {
          setMouseEnter(false);
          const key = e.key.toLowerCase();
          if (key === 'enter' || key === 'tab') {
            const tempValue = type === 'amount' ? toAmount(viewValue) : viewValue;
            setFieldValue(name, tempValue);
          }
          if (key === 'escape') {
            setFieldValue(name, value?.toLocaleString() ?? '');
          }
          if (onKeyDown) {
            onKeyDown(e);
          }
        },
      }
    };

    useEffect(() => {
      const tempValue = type === 'amount' ? value?.toLocaleString() ?? '' : value;
      if (tempValue !== viewValue) {
        setViewValue(tempValue);
      }
    }, [value]);

    return (
      <Tooltip open={tooltipOpen} title={tooltipTitle}>
        <TextField fullWidth
          type={type === 'amount' ? 'text' : type}
          value={viewValue}
          {...commonProps}
          {...fieldProps}
          placeholder={placeholder}
        />
      </Tooltip>
    );
  } // end of InputProps

  if (isSelect(props)) {
    const {
      multiple,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
      value,
    } = props;

    const {
      label,
      variant,
      error,
      helperText,
      ...restCommonProps
    } = commonProps;

    const options = props.options?.map((option) =>
      isDataFieldValue(option)
        ? { key: option, text: option }
        : option
    ) ?? [];

    const getOption = (value: DataFieldValue): Option | null => {
      if (!value) {
        return null;
      }
      return options.find(option => option.key === value) ?? null;
    };

    const getValue = (value: DataFieldValue | DataFieldValue[]): Option[] | Option | null => {
      if (Array.isArray(value)) {
        const result = value.map(getOption)
        .filter(v => typeof v !== 'undefined') as Option[];
        if (result.length === 0) {
          return multiple ? [] : null;
        }
        return multiple ? result : result[0];
      }
      return getOption(value);
    };

    const selectProps: Pick<AutocompleteProps<Option, boolean | undefined, boolean | undefined, undefined>,
      'getOptionLabel'
      | 'isOptionEqualToValue'
      | 'loading'
      | 'loadingText'
      | 'multiple'
      | 'noOptionsText'
      | 'onBlur'
      | 'onChange'
      | 'onClick'
      | 'onFocus'
      | 'onInputChange'
      | 'onKeyUp'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'options'
      | 'readOnly'
      | 'renderInput'
      | 'value'> = {
      multiple,
      onBlur,
      onClick,
      onFocus,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
      options,
      readOnly,
      getOptionLabel: (option) => `${option.text}`,
      loading: options.length > 0,
      loadingText: '불러오는 중',
      noOptionsText: '결과가 없습니다.',
      value: getValue(value),
      renderInput: (params) => (
        <TextField
          {...params}
          label={label}
          variant={variant}
          error={error}
          helperText={helperText}
          fullWidth
        />
      ),

      isOptionEqualToValue: (option, value) => {
        if (!value) {
          return false;
        }
        return option.key === value.key;
      },

      onChange: (e, newValue) => {
        const getResult = (): DataFieldValue[] | DataFieldValue => {
          if (multiple) {
            if (Array.isArray(newValue)) {
              return newValue.map(option => option.key);
            }
            const v = newValue?.key ?? '';
            if (!v) {
              return [];
            }
            return [v];
          }
          if (Array.isArray(newValue)) {
            if (newValue.length === 0) {
              return '';
            }
            return newValue.map(option => option.key)[0];
          }
          return newValue?.key ?? '';
        };
        const result = getResult();
        setFieldValue(name, result);
        if (onChange) {
          onChange(e, result);
        }
      },

      onInputChange: (e, value, reason) => {
        if (reason === 'clear') {
          setFieldValue(name, multiple ? [] : '');
          if (onChange) {
            onChange(e, multiple ? [] : '');
          }
        }
      },
    };
    return (
      <Autocomplete fullWidth
        {...restCommonProps}
        {...selectProps}
      />
    );
  } // end of SelectProps

  if (isCheckbox(props)) {
    const {
      allText = '전체',
      disableAll,
      showTooltip,
      value
    } = props;

    const options = props.options?.map(option => isOption(option) ? option : {
      key: option,
      text: option
    }) ?? [];

    const isChecked = (option: Option): boolean => value.includes(option.key);

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
                <Tooltip title={`${label} - ${allText}`} open={showTooltip}>
                  <Checkbox
                    readOnly={readOnly}
                    disabled={disabled}
                    checked={value && options.length === value.length}
                    onChange={() => {
                      if (value && options.length === value.length) {
                        setFieldValue(name, []);
                      } else {
                        setFieldValue(name, options.map(option => option.key));
                      }
                    }}
                  />
                </Tooltip>
              }
            />
          )}
          {options.map((option, i) => (
            <FormControlLabel
              key={i}
              label={`${option.text}`}
              control={
                <Tooltip title={option.tooltip ?? `${label} - ${option.text}`} open={showTooltip}>
                  <Checkbox
                    name={name}
                    value={option.key}
                    readOnly={readOnly}
                    disabled={disabled}
                    checked={isChecked(option)}
                    onChange={() => {
                      if (isChecked(option)) {
                        setFieldValue(name, value.filter(item => item !== option.key));
                      } else {
                        setFieldValue(name, [...value, option.key]);
                      }
                    }}
                  />
                </Tooltip>
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
      mask = '____-__-__',
      cancelText = '취소',
      clearText = '초기화',
      format = 'YYYY-MM-DD',
      openTo = 'day',
      okText = '적용',
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
      value,
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
      clearable,
      disableCloseOnSelect,
      disableFuture,
      disableHighlightToday,
      disableOpenPicker,
      disablePast,
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
      showDaysOutsideCurrentMonth,
      showTodayButton,
      showToolbar,
      todayText,
      toolbarPlaceholder,
      toolbarTitle,
      inputFormat: inputFormat ?? format,
      toolbarFormat: toolbarFormat ?? format,
      onChange: (date) => {
        setFieldValue(name, date ?? '');
      },
      onError: (reason) => {
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
      renderInput: (params) => (
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