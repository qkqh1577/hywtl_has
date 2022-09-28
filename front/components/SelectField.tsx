import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useMemo, } from 'react';
import {
  DataFieldValue,
  FieldProps,
  FieldViewProps,
  isOption,
  MuiTextFieldProps,
  MuiViewProps,
  Option
} from 'components/DataFieldProps';
import { ColorPalette } from 'app/view/App/theme';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { useDataProps } from 'components/DataField';

export interface SelectFieldProps
  extends FieldProps,
          Omit<MuiTextFieldProps,
            | 'name'
            | 'label'
            | 'value'
            | 'fullWidth'
            | 'disabled'> {
  options: Option[] | DataFieldValue[] | null | undefined;
  multiple?: boolean;
}

interface ViewProps
  extends Omit<SelectFieldProps, | FieldViewProps
                                 | 'options'>,
          Pick<MuiTextFieldProps,
            | MuiViewProps
            | 'SelectProps'
            | 'children'> {
}

function FieldView(props: ViewProps) {

  return <TextField
    fullWidth
    select
    {...props}
  />;
}

export default function SelectField(props: SelectFieldProps) {
  const {
          name,
          autoSubmit,
          startAdornment,
          endAdornment,
          disableLabel,
          labelPosition,
          labelWidth,
          status,
          multiple,
          defaultValue,
          InputProps,
          SelectProps,
          options,
          variant = 'standard',
          required:        propsRequired,
          label:           propsLabel,
          helperText:      propsHelperText,
          backgroundColor: propsBackgroundColor,
          ...              restProps
        } = props;

  const children = useMemo((): React.ReactNode | React.ReactNode[] => {
    if (!options) {
      return (
        <MenuItem value="">-</MenuItem>
      );
    }

    return [{ key: '', text: '선택' }, ...options]
    .map((option) => {
      if (isOption(option)) {
        if (option.invisible) {
          return null;
        }
        return (
          <MenuItem
            key={option.key}
            value={option.key}
            disabled={option.disabled}
            children={option.text}
          />
        );
      }
      return (
        <MenuItem
          key={option}
          value={option}
          children={option}
        />
      );
    })
    .filter(option => option !== null);
  }, [options]);

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
  const value = useMemo(() => children === null || !options || options.length === 0 || typeof dataValue === 'undefined' ? '' : dataValue, [dataValue, children, options]);
  const isEmptyValue = !value || (Array.isArray(value) && value.length === 0);

  const fieldProps: ViewProps = {
    variant,
    name,
    value,
    error,
    helperText,
    disabled,
    onChange,
    InputProps:  {
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
    SelectProps: {
      ...SelectProps,
      multiple,
      displayEmpty: !required,
      sx: {
        height:               variant === 'outlined' ? '32px' : '40px',
        fontSize:             '13px',
        fontFamily:           'Noto Sans KR',
        color:                isEmptyValue ? ColorPalette._b2b4b7 : ColorPalette._252627,
        border:               variant === 'outlined' ? `1px solid ${ColorPalette._e4e9f2}` : 'none',
        borderBottom:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:         variant === 'outlined' ? '5px' : '0',
        backgroundColor:      propsBackgroundColor ?? ColorPalette._ffffff,
        '& .MuiSvgIcon-root': {
          color: ColorPalette._386dd6,
        },
        '&::after':           {
          borderBottom: `1px solid ${ColorPalette._0047d3}`,
        },
        '&:hover::before':    {
          borderBottom: `1px solid ${ColorPalette._0047d3} !important`,
        },
        '&:hover > fieldset': {
          borderColor: `${ColorPalette._0047d3} !important`
        },
        '& > fieldset':       {
          borderWidth: '1px !important',
        },
      },
      MenuProps:    {
        sx: {
          '& > .MuiMenu-paper': {
            marginTop:    variant === 'outlined' ? '-8px' : '8px',
            marginLeft:   variant === 'outlined' ? '8px' : 0,
            overflowY:    'scroll',
            borderRadius: '5px',
            boxShadow:    `2px 2px 10px 0px ${ColorPalette._b2b4b7}`,
            maxHeight:    `${28 * 5}px`,

            '& > ul':      {
              padding:      0,
              borderRadius: '5px 0 0 5px',
            },
            '& > ul > li': {
              fontSize:   '13px',
              color:      ColorPalette._252627,
              minHeight:  '28px',
              padding:    '0 10px',
              wordBreak:  'break-all',
              whiteSpace: 'break-spaces',
            },

            '&::-webkit-scrollbar':       {
              width:           '10px',
              backgroundColor: ColorPalette._e4e9f2,
              borderRadius:    '0 5px 5px 0',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: ColorPalette._697183,
              borderRadius:    '0 5px 5px 0',
            }
          },
        }
      }
    },
    children
  };

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
      <Box
        sx={{
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