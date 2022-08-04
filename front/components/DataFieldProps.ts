import React, { SyntheticEvent } from 'react';
import { TextFieldProps } from '@mui/material';
import { InputProps as MuiInputProps } from '@mui/material/Input/Input';

export enum FieldStatus {
  /** 정상 상태, 드래그 가능, 편집 가능, 필드 제공 */
  Idle,
  /** 잠금 모드, 드래그 불가, 편집 불가, 필드 제공 */
  Disabled,
  /** 읽기 모드, 드래그 가능, 편집 불가, 필드 제공 */
  ReadOnly,
  /** 보기 모드, 드래그 가능, 편집 불가, 필드 미제공 */
  View,
}

export interface FieldValue<T = any> {
  value: T;
  edit: boolean | undefined;
}

export type DataFieldValue = string | number;

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
}

export const isDataFieldValue = (value: any): value is DataFieldValue => {
  return value === null || typeof value === 'string' || typeof value === 'number';
};
export const isOption = (value: any): value is Option => {
  return !isDataFieldValue(value) && isDataFieldValue((value as Option).key);
};