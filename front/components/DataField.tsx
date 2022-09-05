import React, {
  ChangeEvent,
  FocusEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  DataFieldValue,
  equals,
  FieldStatus,
  getValue,
} from 'components/DataFieldProps';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';


interface DataProps {
  edit: boolean;
  error: boolean;
  value: any;
  disabled: boolean;
  readOnly: boolean;
  label: string | undefined;
  required?: boolean;
  helperText?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => void;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>;
}

interface Props<T> {
  name: string;
  label: string;
  disableLabel?: boolean;
  status?: FieldStatus;
  helperText?: React.ReactNode;
  required?: boolean;
  onChange?: (e: ChangeEvent<T>) => void;
  onBlur?: FocusEventHandler<T>;
  formikContext?: FormikContextType<any>;
}

export function useDataProps<T>(props: Props<T>): DataProps {
  const {
          name,
          disableLabel,
          label:      propsLabel,
          helperText: propsHelperText,
          required:   propsRequired,
          status,
          onChange: propsOnChange,
          onBlur:   propsOnBlur,
        } = props;

  const formikContext = props.formikContext ?? useContext(FormikContext);
  const values = formikContext?.values ?? {};
  const errors = formikContext?.errors ?? {};

  const formikValue = getValue<DataFieldValue>(values, name) ?? '';
  const formikEdit = values.edit || typeof values.edit === 'undefined';
  const formikError = !!errors[name];
  const setFieldValue = formikContext?.setFieldValue ?? undefined;

  const [value, setValue] = useState<any>('');
  const [edit, setEdit] = useState<boolean>(status === FieldStatus.Idle || false);
  const [error, setError] = useState<boolean>(false);

  const label = useMemo(() => disableLabel ? undefined : propsLabel, [propsLabel, disableLabel]);
  const helperText = useMemo(() => error ? `${propsLabel}${getAuxiliaryPostPosition(propsLabel)} 필수 항목입니다.` : propsHelperText, [propsLabel, propsHelperText]);

  const disabled = useMemo(() => status === FieldStatus.Disabled, [status]);
  const readOnly = useMemo(() => status === FieldStatus.ReadOnly || !edit, [status, edit]);
  const required = useMemo(() => edit && required, [edit, propsRequired]);

  const onChange = useCallback((e) => {

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
      setValue(result);
    }
    else {
      setValue(targetValue);
    }
  }, [propsOnChange, edit]);

  const onBlur = useCallback((e) => {
    if (!edit) {
      return;
    }
    if (propsOnBlur) {
      propsOnBlur(e);
    }
    setFieldValue(name, value);
  }, [propsOnBlur, edit, value, setFieldValue]);

  useEffect(() => {
    if (!equals(value, formikValue)) {
      setValue(formikValue);
    }
  }, [formikValue]);

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
    onBlur
  };
}