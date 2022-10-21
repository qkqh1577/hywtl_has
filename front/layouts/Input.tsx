import React from 'react';
import {
  Input as MuiInput,
  InputAdornment,
  InputProps as MuiInputProps,
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';

export interface InputProps
  extends Omit<MuiInputProps, | 'fullWidth' | 'inputProps'> {
  variant?: 'outlined' | 'standard';
  inputProps?: Omit<MuiInputProps['inputProps'], |'style'>;
  isAmount?: boolean;
  fullHeight?: boolean;
}

export default function Input({ variant, ...props }: InputProps) {
  if (variant === 'outlined') {
    return (<OutlinedInput {...props} />);
  }
  return (<StandardInput {...props} />);
}

export function OutlinedInput({ isAmount, fullHeight, ...props }: Omit<InputProps, |'variant'>) {
  return (
    <MuiInput
      {...props}
      fullWidth
      startAdornment={isAmount ?
        <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
          <TextBox variant="body11">￦</TextBox>
        </InputAdornment>
        : props.startAdornment}
      sx={props.multiline ? {
        ...props.sx,
        height:                        fullHeight ? '100%' : 'auto',
        padding:                       `10px`,
        borderRadius:                  '5px',
        backgroundColor:               props.readOnly || props.disabled ? ColorPalette._f4f4f4 : ColorPalette._ffffff,
        '& > .MuiInputBase-multiline': {
          padding: 0,
        },
        '&::before':                   {
          borderBottom: 'none !important',
        },
        '&::after':                    {
          borderBottom: 'none !important',
        },
      } : {
        ...props.sx,
        padding:         '0 10px',
        height:          fullHeight ? '100%' : 'auto',
        border:          `1px solid ${ColorPalette._e4e9f2}`,
        backgroundColor: props.readOnly || props.disabled ? ColorPalette._f4f4f4 : ColorPalette._ffffff,
        borderRadius:    '5px',
        '&::before':     {
          borderBottom: 'none !important',
        },
        '&::after':      {
          borderBottom: 'none !important',
        },
        '&.Mui-focused': {
          border: `1px solid ${ColorPalette._0047d3}`
        }
      }}
      inputProps={{
        ...props.inputProps,
        style: {
          fontFamily:      'Noto Sans KR',
          height:          fullHeight ? '100%' : props.multiline ? '80px' : (props.size === 'small' ? '24px' : '32px'),
          fontSize:        props.size === 'small' ? '13px' : '11px',
          color:           ColorPalette._252627,
          border:          'none',
          backgroundColor: 'transparent',
          boxSizing:       'border-box',
          cursor:          props.readOnly || props.disabled ? 'default' : 'text',
          textAlign:       isAmount || props.type === 'number' ? 'right' : 'left',
        },
      }}
    />
  );
}

export function StandardInput({ isAmount, fullHeight, ...props }: Omit<InputProps, |'variant'>) {

  return (
    <MuiInput
      {...props}
      startAdornment={isAmount ?
        <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
          <TextBox variant="body11">￦</TextBox>
        </InputAdornment>
        : props.startAdornment}
      fullWidth
      sx={props.multiline ? {
        ...props.sx,
        height:                        fullHeight ? '100%' : 'auto',
        backgroundColor:               props.readOnly || props.disabled ? ColorPalette._f4f4f4 : ColorPalette._ffffff,
        '& > .MuiInputBase-multiline': {
          padding: 0,
        }
      } : {
        ...props.sx,
        height:          fullHeight ? '100%' : 'auto',
        backgroundColor: props.readOnly || props.disabled ? ColorPalette._f4f4f4 : ColorPalette._ffffff,
      }}
      inputProps={{
        ...props.inputProps,
        style: {
          fontFamily:      'Noto Sans KR',
          padding:         `${props.multiline ? 10 : 0}px 10px`,
          height:          fullHeight ? '100%' : props.multiline ? '80px' : '40px',
          fontSize:        '13px',
          color:           ColorPalette._252627,
          border:          'none',
          borderBottom:    `1px solid ${ColorPalette._e4e9f2}`,
          backgroundColor: 'transparent',
          borderRadius:    0,
          boxSizing:       'border-box',
          cursor:          props.readOnly || props.disabled ? 'default' : 'text',
          textAlign:       isAmount || props.type === 'number' ? 'right' : 'left',
        },
      }}
    />
  );
}