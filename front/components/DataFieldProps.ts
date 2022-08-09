import { FormikValues } from 'formik';

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

export type DataFieldValue = string | number;

export interface Option {
  key: DataFieldValue;
  text: DataFieldValue;
}

export function isDataFieldValue(value: any): value is DataFieldValue {
  return value === null || typeof value === 'string' || typeof value === 'number';
}

export function isOption(value: any): value is Option {
  return !isDataFieldValue(value) && isDataFieldValue((value as Option).key);
}


export function getValue<T = unknown>(values: FormikValues,
                                      name: string
): T {
  const key = name.includes('.') ? name.split('.')[0] : name;
  const value = values[key];
  if (!name.includes('.')) {
    return value;
  }
  return getValue(value, name.substring(key.length + 1));
}