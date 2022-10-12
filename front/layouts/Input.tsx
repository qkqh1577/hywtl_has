import React from 'react';
import {
  Input as MuiInput,
  InputProps as MuiInputProps,
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';

export interface InputProps
  extends Omit<MuiInputProps, | 'fullWidth' | 'inputProps'> {
  variant?: 'outlined' | 'standard';
  inputProps?: Omit<MuiInputProps['inputProps'], |'style'>;
}

export default function Input({ variant, ...props }: InputProps) {
  if (variant === 'outlined') {
    return (<OutlinedInput {...props} />);
  }
  return (<StandardInput {...props} />);
}

export function OutlinedInput(props: Omit<InputProps, |'variant'>) {
  return (
    <MuiInput
      {...props}
      fullWidth
      sx={props.multiline ? {
        ...props.sx,
        padding:                       0,
        borderRadius:                  '5px',
        backgroundColor:               ColorPalette._ffffff,
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
        '&::before':             {
          borderBottom: 'none !important',
        },
        '&::after':              {
          borderBottom: 'none !important',
        },
        '&.Mui-focused > input': {
          border: `1px solid ${ColorPalette._0047d3}  !important`
        }
      }}
      inputProps={{
        ...props.inputProps,
        style: {
          fontFamily:      'Noto Sans KR',
          padding:         `${props.multiline ? 10 : 0}px 10px`,
          height:          props.multiline ? '80px' : (props.size === 'small' ? '24px' : '32px'),
          fontSize:        props.size === 'small' ? '13px' : '11px',
          color:           ColorPalette._252627,
          border:          `1px solid ${ColorPalette._e4e9f2}`,
          borderRadius:    '5px',
          backgroundColor: props.readOnly || props.disabled ? ColorPalette._f4f4f4 : ColorPalette._ffffff,
          boxSizing:       'border-box',
          cursor:          props.readOnly || props.disabled ? 'default' : 'text',
          textAlign:       props.type === 'number' ? 'right' : (props.multiline ? 'left' : props.readOnly ? 'center' : 'left'),
        },
      }}
    />
  );
}

export function StandardInput(props: Omit<InputProps, |'variant'>) {

  return (
    <MuiInput
      {...props}
      fullWidth
      sx={props.multiline ? {
        ...props.sx,
        backgroundColor:               ColorPalette._ffffff,
        '& > .MuiInputBase-multiline': {
          padding: 0,
        }
      } : props.sx}
      inputProps={{
        ...props.inputProps,
        style: {
          fontFamily:      'Noto Sans KR',
          padding:         `${props.multiline ? 10 : 0}px 10px`,
          height:          props.multiline ? '80px' : '40px',
          fontSize:        '13px',
          color:           ColorPalette._252627,
          border:          'none',
          borderBottom:    `1px solid ${ColorPalette._e4e9f2}`,
          borderRadius:    0,
          backgroundColor: ColorPalette._ffffff,
          boxSizing:       'border-box',
          cursor:          props.readOnly || props.disabled ? 'default' : 'text',
          textAlign:       props.type === 'number' ? 'right' : (props.multiline ? 'left' : props.readOnly ? 'center' : 'left'),
        },
      }}
    />
  );
}