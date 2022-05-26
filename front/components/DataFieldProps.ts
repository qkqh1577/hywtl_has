import React, { SyntheticEvent } from 'react';
import { AutocompleteProps, TextFieldProps } from '@mui/material';
import { InputProps as MuiInputProps } from '@mui/material/Input/Input';
import { FormikErrors, FormikValues } from 'formik';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';

export type DataFieldValue = string | number;
export type DataFieldType =
  'text'
  | 'password'
  | 'number'
  | 'amount'
  | 'select'
  | 'checkbox'
  | 'date';

export interface Option {
  key: DataFieldValue;
  text: DataFieldValue;
  tooltip?: string;
}

export interface Props extends Pick<MuiInputProps
  , 'autoFocus'
  | 'disabled'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'sx'> {
  disableLabel?: boolean;
  errorText?: string;
  errors: FormikErrors<FormikValues>;
  helperText?: string | React.ReactNode;
  label: string;
  name: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SyntheticEvent, value?: DataFieldValue | DataFieldValue[]) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  type?: DataFieldType;
  value: DataFieldValue | DataFieldValue[] | Date | null;
  variant?: 'standard' | 'filled' | 'outlined';
}

export interface CommonProps extends Pick<TextFieldProps
  , 'autoFocus'
  | 'disabled'
  | 'error'
  | 'helperText'
  | 'id'
  | 'label'
  | 'name'
  | 'placeholder'
  | 'required'
  | 'size'
  | 'sx'
  | 'variant'> {
  type?: DataFieldType;
}

export interface InputProps extends Props, Pick<MuiInputProps
  , 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onMouseEnter'
  | 'onMouseLeave'> {
  endAdornment?: React.ReactNode | React.ReactElement;
  startAdornment?: React.ReactNode | React.ReactElement;
  tooltip?: string;
  type?: 'amount' | 'number' | 'text' | 'password';
  value: DataFieldValue | '';
}

export interface SelectProps extends Props, Pick<AutocompleteProps<Option, boolean | undefined, boolean | undefined, undefined>
  , 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'onKeyUp'
  | 'onMouseEnter'
  | 'onMouseLeave'> {
  value: DataFieldValue | DataFieldValue[];
  options: Option[] | DataFieldValue[] | null;
  type: 'select';
  multiple?: boolean;
}

export interface CheckboxProps extends Props {
  allText?: string;
  disableAll?: boolean;
  showTooltip?: boolean;
  options: Option[] | DataFieldValue[] | null;
  value: DataFieldValue[];
}

export interface DateProps extends Props, Pick<DatePickerProps,
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
  | 'onClose'
  | 'onMonthChange'
  | 'onOpen'
  | 'onViewChange'
  | 'onYearChange'
  | 'openTo'
  | 'showDaysOutsideCurrentMonth'
  | 'showTodayButton'
  | 'showToolbar'
  | 'todayText'
  | 'toolbarFormat'
  | 'toolbarPlaceholder'
  | 'toolbarTitle'> {
  value: Date | null;
  format?: string;
}

export const isDataFieldValue = (value: any): value is DataFieldValue => {
  return value === null || typeof value === 'string' || typeof value === 'number';
};
export const isOption = (value: any): value is Option => {
  return !isDataFieldValue(value) && isDataFieldValue((value as Option).key);
};

export const isSelect = (props: Props): props is SelectProps => {
  return props.type === 'select';
};

export const isInput = (props: Props): props is InputProps => {
  return typeof props.type === 'undefined'
    || props.type === 'amount'
    || props.type === 'number'
    || props.type === 'text'
    || props.type === 'password';
};

export const isCheckbox = (props: Props): props is CheckboxProps => {
  return props.type === 'checkbox';
};

export const isDate = (props: Props): props is DateProps => {
  return props.type === 'date';
};