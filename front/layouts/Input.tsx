import React from 'react';
import {
  Input as MuiInput,
  InputProps
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';

interface Props
  extends Omit<InputProps, | 'fullWidth' | 'inputProps'> {
  variant?: 'outlined' | 'standard';
  inputProps?: Omit<InputProps['inputProps'], |'style'>;
}

export default function Input({ variant, ...props }: Props) {
  if (variant === 'outlined') {
    return (<OutlinedInput {...props} />);
  }
  return (<StandardInput {...props} />);
}

export function OutlinedInput(props: Omit<Props, |'variant'>) {

  return (
    <MuiInput
      {...props}
      fullWidth
      sx={props.multiline ? {
        ...props.sx,
        backgroundColor:               ColorPalette._ffffff,
        '& > .MuiInputBase-multiline': {
          padding: 0,
        },
      } : {
        ...props.sx,
        '&::before': {
          borderBottom: 'none !important',
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
          backgroundColor: ColorPalette._ffffff,
          boxSizing:       'border-box',

        },
      }}
    />
  );
}

export function StandardInput(props: Omit<Props, |'variant'>) {

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
        },
      }}
    />
  );
}