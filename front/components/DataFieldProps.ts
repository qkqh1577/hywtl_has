import { SxProps } from '@mui/system';
import React from 'react';
import { FormikContextType } from 'formik';

export enum ApiStatus {
  IDLE     = 'idle',
  REQUEST  = 'request',
  DONE     = 'done',
  FAIL     = 'fail',
}

export type Values = {
  [key: string]: any;
}

export enum FieldStatus {
  /** 정상 상태, 드래그 가능, 편집 가능, 필드 제공 */
  Idle,
  /** 잠금 모드, 드래그 불가, 편집 불가, 필드 제공 */
  Disabled,
  /** 읽기 모드, 드래그 가능, 편집 불가, 필드 제공 */
  ReadOnly,
}


export type DataFieldValue = string | number;

type SX = SxProps | undefined;

export interface LabelProps {
  label: React.ReactNode;
  disableLabel?: boolean;
  labelWidth?: number;
  labelPosition?: 'top' | 'left';
  labelSX?: SX;
}

export interface FieldProps
  extends LabelProps {
  name: string;
  status?: FieldStatus;
  helperText?: React.ReactNode;
  required?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  formik?: FormikContextType<any>;
  autoSubmit?: boolean;
  backgroundColor?: string;
  border?: string;
}

export interface Option {
  key: DataFieldValue;
  text: DataFieldValue;
  disabled?: boolean;
  invisible?: boolean;
}

export function isDataFieldValue(value: any): value is DataFieldValue {
  return value === null || typeof value === 'string' || typeof value === 'number';
}

export function isOption(value: any): value is Option {
  return !isDataFieldValue(value) && isDataFieldValue((value as Option).key);
}


export function getValue<T = unknown>(values: Values,
                                      name: string
): T | undefined {
  if (!values) {
    return undefined;
  }
  const key = name.includes('.') ? name.split('.')[0] : name;
  const value = values[key];
  if (!name.includes('.')) {
    return value;
  }
  return getValue(value, name.substring(key.length + 1));
}

export function isEmpty(value: unknown): boolean {
  if (typeof value === 'undefined' || value === null) {
    return true;
  }
  if (typeof value === 'string') {
    return value === '' || value.trim() === '';
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return true;
    }
    return keys
    .filter(key => value.hasOwnProperty(key))
    .map(key => value[key])
    .map(item => isEmpty(item))
    .filter(flag => !flag)
      .length === 0;
  }
  // NaN
  return typeof value === 'number' && !value && value !== 0;
}

export function compress<T = unknown>(values: T): T {
  if (!values || typeof values !== 'object') {
    return values;
  }
  if (Array.isArray(values)) {
    return values.map(compress) as unknown as T;
  }

  const result: Values = {};

  const keys = Object.keys(values);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[key];
    if (!isEmpty(value)) {
      result[key] = typeof value === 'object' ? compress(value) : value;
    }
  }
  return result as T;
}

export function equals<T = unknown>(a: T,
                                    b: T
): boolean {
  if (isEmpty(a) && isEmpty(b)) {
    return true;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const compressedA = compress(a as Values);
    const compressedB = compress(b as Values);
    const keys = Object.keys(compressedA);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!equals(compressedA[key], compressedB[key])) {
        return false;
      }
    }
    return true;
  }

  return a === b;
}