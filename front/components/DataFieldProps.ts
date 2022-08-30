import { FormikValues } from 'formik';
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps
} from '@mui/material/TextField/TextField';

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

export type MuiTextFieldProps = StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;

export type DataFieldValue = string | number;

export interface LabelProps {
  disableLabel?: boolean;
  width?: number;
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


export function getValue<T = unknown>(values: FormikValues,
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

export type Value = {
  [key: string]: any;
}

export function compress(values: Value): Value {
  const result: Value = {};
  const keys = Object.keys(values);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[key];
    if (!isEmpty(value)) {
      result[key] = typeof value === 'object' ? compress(value) : value;
    }
  }
  return result;
}

export function equals<T = unknown>(a: T,
                                    b: T
): boolean {
  if (isEmpty(a) && isEmpty(b)) {
    return true;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const compressedA = compress(a);
    const compressedB = compress(b);
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