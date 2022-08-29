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
  getValue
} from 'components/DataFieldProps';
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps
} from '@mui/material/TextField/TextField';
import { ColorPalette } from 'app/view/App/theme';
import RequiredMark from 'components/RequiredMark';

type MuiTextFieldProps = StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;

export interface TextFieldProps
  extends Omit<MuiTextFieldProps,
    | 'name'
    | 'label'
    | 'value'
    | 'fullWidth'
    | 'variant'
    | 'disabled'> {
  disableLabel?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
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
                               | 'disableLabel'
                               | 'label'>,
          Pick<MuiTextFieldProps,
            | 'value'
            | 'variant'> {
}

function TextFieldView(props: ViewProps) {
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
          type = 'text',
          startAdornment,
          endAdornment,
          required,
          onChange,
          onBlur,
          status,
          size,
          label:        propsLabel,
          disableLabel: propsDisableLabel,
          helperText:   propsHelperText,
          ...           restProps
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

  const label = useMemo(() => propsDisableLabel ? undefined : propsLabel, [propsDisableLabel, propsLabel]);
  const helperText = useMemo(() => error ? `${propsLabel}${getAuxiliaryPostPosition(propsLabel)} 필수 항목입니다.` : propsHelperText, [propsLabel, propsHelperText]);

  const disabled = useMemo(() => status === FieldStatus.Disabled, [status]);
  const readOnly = useMemo(() => status === FieldStatus.ReadOnly || !edit, [status, edit]);

  const variant = propsDisableLabel ? 'outlined' : 'standard';

  const mappingByShape = (
    outlined: string,
    smallOutlined: string,
    labelStandard: string
  ) => {
    return variant === 'outlined' ? (size === 'small' ? smallOutlined : outlined) : labelStandard;
  };

  const inputProps: MuiTextFieldProps['inputProps'] = {
    style: {
      padding:      '0 10px',
      height:       mappingByShape('32px', '24px', '40px'),
      fontSize:     mappingByShape('13px', '11px', '13px'),
      color:        ColorPalette.DarkGray,
      border:       variant === 'outlined' ? `1px solid ${ColorPalette.Blue['7']}` : 'none',
      borderBottom: `1px solid ${ColorPalette.Blue['7']}`,
      borderRadius: variant === 'outlined' ? '5px' : '0',
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

  if (variant === 'standard') {
    return (
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        flex:           1,
        justifyContent: 'space-between',
      }}>
        <Typography sx={{
          fontSize:    '13px',
          marginRight: '20px',
          maxHeight:   inputProps.style!.height!,
          color:       ColorPalette.Grey['1'],
        }}>
          <RequiredMark required={edit && required} text={label} />
        </Typography>
        <TextFieldView
          {...restProps}
          {...fieldProps}
        />
      </Box>
    );
  }

  return (
    <TextFieldView
      {...restProps}
      {...fieldProps}
    />
  );
}