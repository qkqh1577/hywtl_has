import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  FormikContext,
  FormikContextType,
} from 'formik';
import {
  DataFieldValue,
  equals,
  FieldProps,
  FieldStatus,
  getValue,
} from 'components/DataFieldProps';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';


interface DataProps<T> {
  edit: boolean;
  error: boolean;
  value: T | undefined;
  disabled: boolean;
  readOnly: boolean;
  label: string | undefined;
  required?: boolean;
  helperText?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => void;
  formik: FormikContextType<any>;
}

interface EventProps<E>
  extends FieldProps {
  onChange?: (e: ChangeEvent<E>) => void;
}

export function useDataProps<T = DataFieldValue, E = HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>(props: EventProps<E>): DataProps<T> {
  const {
          name,
          disableLabel,
          label:      propsLabel,
          helperText: propsHelperText,
          required:   propsRequired,
          status,
          onChange: propsOnChange,
          autoSubmit,
        } = props;

  const formik = props.formik ?? useContext(FormikContext);
  const values = formik?.values ?? {};
  const errors = formik?.errors ?? {};

  const formikValue = getValue<T>(values, name) ?? undefined;
  const formikEdit = values.edit || typeof values.edit === 'undefined';
  const formikError = !!errors[name];
  const setFieldValue = formik?.setFieldValue ?? undefined;

  const [value, setValue] = useState<T>();
  const [edit, setEdit] = useState<boolean>(status === FieldStatus.Idle || false);
  const [error, setError] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<NodeJS.Timeout>();

  const label = useMemo(() => disableLabel ? undefined : propsLabel, [propsLabel, disableLabel]);
  const helperText = useMemo(() => error ? `${propsLabel}${getAuxiliaryPostPosition(propsLabel)} 필수 항목입니다.` : propsHelperText, [propsLabel, propsHelperText]);

  const disabled = useMemo(() => status === FieldStatus.Disabled, [status]);
  const readOnly = useMemo(() => status === FieldStatus.ReadOnly || !edit, [status, edit]);
  const required = useMemo(() => edit && required, [edit, propsRequired]);

  const onChange = (e) => {
    if (!edit) {
      return;
    }
    if (propsOnChange) {
      propsOnChange(e);
    }
    const targetValue = e.target.value ?? '';
    if (Array.isArray(value)) {
      const result: any[] = [];
      for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (v === targetValue || Object.is(v, targetValue)) {
          continue;
        }
        result.push(v);
      }
      if (result.length === value.length) {
        result.push(targetValue);
      }
      setValue(result as unknown as T);
    }
    else {
      setValue(targetValue);
    }
  };
  const onSubmit = formik?.handleSubmit;

  useEffect(() => {
    if (!equals(value, formikValue)) {
      if (typeof value === 'undefined' && typeof formikValue !== 'undefined') {
        setValue(formikValue);
      }
      else {
        setFieldValue(name, value);
        if (autoSubmit && onSubmit) {
          if (waiting) {
            clearTimeout(waiting);
          }
          setWaiting(setTimeout(() => {
            onSubmit();
          }, 2100));
        }
      }
    }
  }, [value, formikValue, waiting, onSubmit]);

  useEffect(() => {
    if (status === FieldStatus.Idle) {
      setEdit(true);
    }
    else if (formikEdit !== edit) {
      setEdit(formikEdit);
    }
  }, [formikEdit, status]);

  useEffect(() => {
    if (formikError !== error) {
      setError(formikError);
    }
  }, [formikError]);


  return {
    edit,
    error,
    label,
    value,
    helperText,
    disabled,
    required,
    readOnly,
    onChange,
    formik,
  };
}
