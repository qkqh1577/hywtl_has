import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  Box,
  InputAdornment,
  TextField as MuiTextField,
} from '@mui/material';
import {
  FieldProps,
  FieldViewProps,
  MuiTextFieldProps,
  MuiViewProps
} from 'components/DataFieldProps';
import { ColorPalette } from 'app/view/App/theme';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { useDataProps } from 'components/DataField';

export interface TextFieldProps
  extends FieldProps,
          Omit<MuiTextFieldProps,
            | 'name'
            | 'label'
            | 'value'
            | 'fullWidth'
            | 'type'
            | 'disabled'> {
  type?: MuiTextFieldProps['type'] | 'amount';
}

interface ViewProps
  extends Omit<TextFieldProps, | FieldViewProps
                               | 'type'>,
          Pick<MuiTextFieldProps,
            | MuiViewProps
            | 'type'> {
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
          required:        propsRequired,
          label:           propsLabel,
          helperText:      propsHelperText,
          backgroundColor: propsBackgroundColor,
          autoSubmit,
          ...restProps
        } = props;

  const {
          error,
          value: dataValue,
          disabled,
          readOnly,
          required,
          helperText,
          onChange,
          label
        } = useDataProps(props);

  const value = useMemo(() => {
    if (typeof dataValue === 'undefined') {
      return '';
    }
    if ((type === 'number' || type === 'amount') && !Number.isNaN(+dataValue)) {
      return +dataValue;
    }
    return dataValue;
  }, [dataValue]);

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
    ...props.inputProps,
    style: {
      fontFamily:      'Noto Sans KR',
      padding:         `${props.multiline ? 10 : 0}px 10px`,
      height:          props.multiline ? '80px' : mappingByShape('32px', '24px', '40px'),
      fontSize:        mappingByShape('13px', '11px', '13px'),
      color:           ColorPalette._252627,
      border:          useMemo(() => variant === 'outlined' ? `1px solid ${ColorPalette._e4e9f2}` : 'none', [variant]),
      borderBottom:    `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:    useMemo(() => variant === 'outlined' ? '5px' : '0', [variant]),
      backgroundColor: propsBackgroundColor ?? ColorPalette._ffffff,
      boxSizing:       'border-box',
      textAlign:       type === 'amount' ? 'right' : 'left',
    },
  };

  const fieldProps: ViewProps = {
    type:       type === 'amount' ? 'number' : type,
    name,
    value,
    variant,
    error,
    helperText,
    required,
    disabled,
    inputProps,
    onChange,
    InputProps: {
      ...InputProps,
      readOnly,
      startAdornment,
      endAdornment: (endAdornment || InputProps?.endAdornment) && (
        <InputAdornment position="end">
          {endAdornment}
          {InputProps?.endAdornment}
        </InputAdornment>
      )
    },
  };

  const sx = useMemo(() => props.multiline ? {
    ...props.sx,
    backgroundColor:               ColorPalette._ffffff,
    '& > .MuiInputBase-multiline': {
      padding: 0,
    }
  } : props.sx, [props.multiline, props.sx]);

  if (!disableLabel) {
    return (
      <DataFieldWithLabel
        labelPosition={labelPosition}
        required={required}
        label={label!}
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