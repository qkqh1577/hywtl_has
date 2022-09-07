import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';

interface ButtonProps
  extends Omit<MuiButtonProps, | 'variant' | 'size'> {
  shape: 'basic1' | 'basic2' | 'basic3' | 'basic4' | 'small';
}

function Basic1Button(props: MuiButtonProps) {

  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        fontFamily:      'Noto Sans KR',
        height:          '32px',
        fontSize:        '13px',
        fontWeight:      'normal',
        padding:         '0 16px',
        backGroundColor: ColorPalette.Blue['1'],
        color:           ColorPalette.White,
        borderRadius:    '5px',
        ...(props.sx ?? {})
      }}
    />
  );
}

function Basic2Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        fontFamily:      'Noto Sans KR',
        height:          '32px',
        fontSize:        '13px',
        fontWeight:      'normal',
        padding:         '0 16px',
        backgroundColor: `${ColorPalette._e4e9f2} !important`,
        color:           ColorPalette._386dd6,
        borderRadius:    '5px',
        ...(props.sx ?? {})
      }}
    />
  );
}

function Basic3Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="outlined"
      sx={{
        fontFamily:      'Noto Sans KR',
        height:          '32px',
        fontSize:        '13px',
        fontWeight:      'normal',
        padding:         '0 16px',
        backGroundColor: ColorPalette.White,
        color:           ColorPalette.Blue['1'],
        borderColor:     ColorPalette.Blue['3'],
        borderRadius:    '5px',
        ...(props.sx ?? {})
      }}
    />
  );
}

function Basic4Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="outlined"
      sx={{
        fontFamily:      'Noto Sans KR',
        height:          '32px',
        fontSize:        '13px',
        fontWeight:      'normal',
        padding:         '0 16px',
        backGroundColor: ColorPalette.Blue['7'],
        color:           ColorPalette.Blue['1'],
        borderColor:     ColorPalette.Blue['3'],
        borderRadius:    '5px',
        ...(props.sx ?? {})
      }}
    />
  );
}

function SmallButton(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        width:           '100%',
        fontFamily:      'Noto Sans KR',
        height:          '28px',
        fontSize:        '12px',
        fontWeight:      'normal',
        backGroundColor: ColorPalette.Blue['1'],
        color:           ColorPalette.White,
        borderRadius:    '5px',
        ...(props.sx ?? {})
      }}
    />
  );
}

export default function Button({ shape = 'basic1', ...props }: ButtonProps) {
  switch (shape) {
    case 'basic1':
      return (<Basic1Button {...props} />);
    case 'basic2':
      return (<Basic2Button {...props} />);
    case 'basic3':
      return (<Basic3Button {...props} />);
    case 'basic4':
      return (<Basic4Button {...props} />);
    case 'small':
      return (<SmallButton {...props} />);
  }
}