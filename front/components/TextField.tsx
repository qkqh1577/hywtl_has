import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  Box,
  TextField as MuiTextField,
} from '@mui/material';
import {
  FieldStatus,
  LabelProps,
  MuiTextFieldProps
} from 'components/DataFieldProps';
import { ColorPalette } from 'app/view/App/theme';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { useDataProps } from 'components/DataField';

export interface TextFieldProps
  extends LabelProps,
          Omit<MuiTextFieldProps,
            | 'name'
            | 'label'
            | 'value'
            | 'fullWidth'
            | 'disabled'> {
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
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
                               | 'disableLabel'
                               | 'labelPosition'
                               | 'labelWidth'
                               | 'labelSX'>,
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
          status,
          size,
          disableLabel,
          labelPosition,
          labelWidth,
          labelSX,
          required:   propsRequired,
          label:      propsLabel,
          helperText: propsHelperText,
          ...         restProps
        } = props;

  const {
          error,
          value,
          disabled,
          readOnly,
          required,
          helperText,
          onChange,
          onBlur,
          label
        } = useDataProps(props);

  const mappingByShape = useCallback((
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
    if (disableLabel) {
      return standard;
    }
    return labelStandard;
  }, [variant, size, disableLabel]);


  const inputProps: MuiTextFieldProps['inputProps'] = {
    style: {
      fontFamily:      'Noto Sans KR',
      padding:         `${props.multiline ? 10 : 0}px 10px`,
      height:          props.multiline ? '80px' : mappingByShape('32px', '24px', '40px'),
      fontSize:        mappingByShape('13px', '11px', '13px'),
      color:           ColorPalette._252627,
      border:          useMemo(() => variant === 'outlined' ? `1px solid ${ColorPalette._e4e9f2}` : 'none', [variant]),
      borderBottom:    `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:    useMemo(() => variant === 'outlined' ? '5px' : '0', [variant]),
      backgroundColor: ColorPalette._fff,
    },
  };

  const fieldProps: FieldProps = {
    type,
    name,
    value,
    variant,
    error,
    helperText,
    disabled,
    inputProps,
    onChange,
    onBlur,
    InputProps: {
      ...InputProps,
      readOnly,
      startAdornment,
      endAdornment,
    },
  };

  const sx = useMemo(() => props.multiline ? {
    ...props.sx,
    backgroundColor:               ColorPalette._fff,
    '& > .MuiInputBase-multiline': {
      padding: 0,
    }
  } : props.sx, [props.multiline, props.sx]);


  if (!disableLabel) {
    return (
      <DataFieldWithLabel
        required={required}
        label={label!}
        labelPosition={labelPosition}
        labelWidth={labelWidth}
        children={
          <FieldView
            {...restProps}
            {...fieldProps}
            sx={sx}
          />
        }
      />
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
          sx={sx}
        />
      </Box>
    </Box>
  );
}