import React, { SyntheticEvent } from 'react';
import { TextFieldProps } from '@mui/material';
import { InputProps as MuiInputProps } from '@mui/material/Input/Input';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';

export type DataFieldValue = string | number;
export type DataFieldType =
  | 'checkbox'
  | 'date';

export interface Option {
  key: DataFieldValue;
  text: DataFieldValue;
}

export interface Props
  extends Pick<MuiInputProps
    , 'autoFocus'
      | 'disabled'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'size'
      | 'sx'> {
  disableLabel?: boolean;
  helperText?: string | React.ReactNode;
  label: string;
  name: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SyntheticEvent,
              value?: DataFieldValue | DataFieldValue[]
  ) => void;
  type?: DataFieldType;
  variant?: 'standard' | 'filled' | 'outlined';
}

export interface CommonProps
  extends Pick<TextFieldProps
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

export interface CheckboxProps
  extends Props {
  allText?: string;
  disableAll?: boolean;
  options: Option[] | DataFieldValue[] | null;
}

export interface DateProps
  extends Props,
          Pick<DatePickerProps,
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
  format?: string;
}

export const isDataFieldValue = (value: any): value is DataFieldValue => {
  return value === null || typeof value === 'string' || typeof value === 'number';
};
export const isOption = (value: any): value is Option => {
  return !isDataFieldValue(value) && isDataFieldValue((value as Option).key);
};

export const isCheckbox = (props: Props): props is CheckboxProps => {
  return props.type === 'checkbox';
};

export const isDate = (props: Props): props is DateProps => {
  return props.type === 'date';
};