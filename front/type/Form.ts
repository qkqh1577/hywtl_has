import { FormikHelpers } from 'formik';

export type FormikPartial<T extends object> = {
  [K in keyof T]-?: T[K] | '';
}

export function toValues<T extends object>(formikPartial: FormikPartial<T>): Partial<T> {
  const keys = Object.keys(formikPartial);
  const values: Partial<T> = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value: unknown = formikPartial[key];
    // include false, zero
    // exclude undefined, empty string, NaN, null
    if (value === false || value === 0 || !value) {
      values[key] = value;
    }
  }
  return values;
}

type Values<P extends object> = P extends FormikPartial<(infer T)> ? Partial<T> : Partial<P>;

export function toPartial<T extends object>(values: Values<T> | undefined,
                                            initialValues: T
): T {
  if (typeof values === 'undefined') {
    return initialValues;
  }
  const keys = Object.keys(initialValues);
  const partial: Partial<Values<T>> = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value: unknown = values[key];
    const initialValue = initialValues[key];
    partial[key] = value ?? initialValue ?? '';
  }
  return partial as T;
}

export interface FormikSubmit<Values>
  extends FormikHelpers<any> {
  values: Values;
}

export type FormikEditable<T extends object> = T & {
  edit: boolean;
}
