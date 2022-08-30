import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  TextField as MuiTextField,
  Typography
} from '@mui/material';
import {
  FormikContext,
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import {
  DataFieldValue,
  equals,
  FieldStatus,
  getValue,
  LabelProps,
  MuiTextFieldProps
} from 'components/DataFieldProps';
import { ColorPalette } from 'app/view/App/theme';
import RequiredMark from 'components/RequiredMark';

export interface TextFieldProps
  extends Omit<MuiTextFieldProps,
    | 'name'
    | 'label'
    | 'value'
    | 'fullWidth'
    | 'disabled'> {
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
  labelProps?: LabelProps;
  status?: FieldStatus;
}

interface FieldProps
  extends Pick<MuiTextFieldProps,
    | 'type'
    | 'onChange'
    | 'onBlur'
    | 'InputProps'
    | 'inputProps'
    | 'label'
    | 'error'
    | 'helperText'
    | 'value'
    | 'variant'
    | 'disabled'
    | 'required'> {
  name: string;
}

interface ViewProps
  extends Omit<TextFieldProps, | 'status'
                               | 'startAdornment'
                               | 'endAdornment'
                               | 'label'
                               | 'labelProps'>,
          Pick<MuiTextFieldProps, | 'value'
                                  | 'variant'> {
}

function FieldView(props: ViewProps) {
  return (
    <MuiTextField
      fullWidth
      {...props}
    />
  );
}

export default function TextField(props: TextFieldProps) {
  const {
          name,
          InputProps,
          type    = 'text',
          variant = 'standard',
          startAdornment,
          endAdornment,
          required,
          onChange,
          onBlur,
          status,
          size,
          labelProps,
          label:      propsLabel,
          helperText: propsHelperText,
          ...         restProps
        } = props;
  const formikContext = useContext(FormikContext);
  const values = formikContext?.values ?? {};
  const errors = formikContext?.errors ?? {};
  const handleChange = formikContext?.handleChange ?? undefined;

  const formikValue = getValue<DataFieldValue>(values, name) ?? '';
  const formikEdit = values.edit || typeof values.edit === 'undefined';
  const formikError = !!errors[name];

  const [value, setValue] = useState<any>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const label = useMemo(() => labelProps?.disableLabel ? undefined : propsLabel, [propsLabel, labelProps]);
  const helperText = useMemo(() => error ? `${propsLabel}${getAuxiliaryPostPosition(propsLabel)} 필수 항목입니다.` : propsHelperText, [propsLabel, propsHelperText]);

  const disabled = useMemo(() => status === FieldStatus.Disabled, [status]);
  const readOnly = useMemo(() => status === FieldStatus.ReadOnly || !edit, [status, edit]);

  const mappingByShape = (
    outlined: string,
    smallOutlined: string,
    labelStandard: string,
    standard?: string,
  ) => {
    if (variant === 'outlined') {
      if (size === 'small') {
        return smallOutlined;
      }
      return outlined;
    }
    if (labelProps?.disableLabel) {
      return standard;
    }
    return labelStandard;
  };

  const inputProps: MuiTextFieldProps['inputProps'] = {
    style: {
      padding:         '0 10px',
      height:          mappingByShape('32px', '24px', '40px'),
      fontSize:        mappingByShape('13px', '11px', '13px'),
      color:           ColorPalette._252627,
      border:          variant === 'outlined' ? `1px solid ${ColorPalette._e4e9f2}` : 'none',
      borderBottom:    `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:    variant === 'outlined' ? '5px' : '0',
      backgroundColor: ColorPalette._fff,
    }
  };

  useEffect(() => {
    if (!equals(value, formikValue)) {
      setValue(formikValue);
    }
  }, [formikValue]);

  useEffect(() => {
    if (formikEdit !== edit) {
      setEdit(formikEdit);
    }
  }, [formikEdit]);

  useEffect(() => {
    if (formikError !== error) {
      setError(formikError);
    }
  }, [formikError]);

  const fieldProps: FieldProps = {
    type,
    name,
    value,
    variant,
    error,
    helperText,
    disabled,
    inputProps,
    onChange:   (e) => {
      if (onChange) {
        onChange(e);
      }
      setValue(e.target.value ?? '');
    },
    onBlur:     (e) => {
      if (onBlur) {
        onBlur(e);
      }
      handleChange(e);
    },
    InputProps: {
      ...InputProps,
      readOnly,
      startAdornment,
      endAdornment,
    },
  };


  if (!labelProps?.disableLabel) {

    return (
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        flex:           1,
        justifyContent: 'space-between',
        height:         '100%',
      }}>
        <Box sx={{
          display:    'flex',
          flexWrap:   'nowrap',
          height:     '100%',
          alignItems: 'center',
        }}>
          <Typography sx={{
            fontSize:  '13px',
            color:     ColorPalette.Grey['1'],
            wordBreak: 'keep-all',
            width:     '110px'
          }}>
            <RequiredMark required={edit && required} text={label} />
          </Typography>
        </Box>
        <Box sx={{
          display:  'flex',
          height:   '100%',
          flexWrap: 'nowrap',
          width:    'calc(100% - 130px)',
        }}>
          <FieldView
            {...restProps}
            {...fieldProps}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'nowrap',
      width:          '100%',
      flex:           1,
      justifyContent: 'space-between',
    }}>
      <Box sx={{
        display:  'flex',
        flexWrap: 'nowrap',
        width:    '100%',
      }}>
        <FieldView
          {...restProps}
          {...fieldProps}
        />
      </Box>
    </Box>
  );
}