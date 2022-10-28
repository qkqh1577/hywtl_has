import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import React from 'react';

interface ButtonProps
  extends Omit<MuiButtonProps, | 'variant' | 'size'> {
  shape?: 'basic1' | 'basic2' | 'basic3' | 'basic4' | 'small' | 'small3';
}

const basicStyle: MuiButtonProps['sx'] = {
  fontFamily:   'Noto Sans KR',
  height:       '32px',
  fontSize:     '13px',
  fontWeight:   'normal',
  padding:      '0 16px',
  borderRadius: '5px',
  boxShadow:    'none',
  wordBreak:    'keep-all',
  whiteSpace:   'nowrap',
};

function getColor(color: string | undefined,
                  defaultColor: string
): string {
  if (color === 'error') {
    return ColorPalette._ffb72b;
  }
  if (color === 'warning') {
    return ColorPalette._eb4c4c;
  }
  return defaultColor;
}

function Basic1Button(props: MuiButtonProps) {


  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        ...basicStyle,
        backgroundColor: getColor(props.color, ColorPalette._386dd6),
        color:           ColorPalette._ffffff,
        '&:hover':       {
          boxShadow:       'none',
          backgroundColor: getColor(props.color, ColorPalette._0047d3),
        },
        ...props.sx,
      } as MuiButtonProps['sx']}
    />
  );
}

function Basic2Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        ...basicStyle,
        backgroundColor: `${ColorPalette._e4e9f2} !important`,
        color:           getColor(props.color, ColorPalette._386dd6),
        border:          'none',
        '&:hover':       {
          boxShadow: 'none',
          border:    `1px solid ${getColor(props.color, ColorPalette._386dd6)}`,
        },
        ...props.sx,
      } as MuiButtonProps['sx']}
    />
  );
}

function Basic3Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="outlined"
      sx={{
        ...basicStyle,
        backgroundColor: ColorPalette._ffffff,
        color:           getColor(props.color, ColorPalette._386dd6),
        border:          `1px solid ${getColor(props.color, ColorPalette._9bb6ea)}`,
        '&:hover':       {
          boxShadow: 'none',
          color:     ColorPalette._386dd6,
          border:    `1px solid ${ColorPalette._0047d3}`,
        },
        ...props.sx,
      } as MuiButtonProps['sx']}
    />
  );
}

function Basic4Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="outlined"
      sx={{
        ...basicStyle,
        backgroundColor: ColorPalette._e4e9f2,
        color:           getColor(props.color, ColorPalette._386dd6),
        borderColor:     getColor(props.color, ColorPalette._9bb6ea),
        '&:hover':       {
          boxShadow:   'none',
          color:       ColorPalette._386dd6,
          borderColor: ColorPalette._9bb6ea,
        },
        ...props.sx,
      } as MuiButtonProps['sx']}
    />
  );
}

function SmallButton(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="contained"
      sx={{
        ...basicStyle,
        width:           '100%',
        height:          '28px',
        fontSize:        '12px',
        backgroundColor: getColor(props.color, ColorPalette._386dd6),
        color:           ColorPalette._ffffff,
        minWidth:        'unset',
        '&:hover':       {
          boxShadow:       'none',
          backgroundColor: getColor(props.color, ColorPalette._0047d3),
        },
        ...props.sx,
      } as MuiButtonProps['sx']}
    />
  );
}

function Small3Button(props: MuiButtonProps) {
  return (
    <MuiButton
      {...props}
      variant="outlined"
      sx={{
        ...basicStyle,
        width:           '100%',
        height:          '28px',
        fontSize:        '12px',
        backgroundColor: ColorPalette._ffffff,
        minWidth:        'unset',
        color:           getColor(props.color, ColorPalette._386dd6),
        border:          `1px solid ${getColor(props.color, ColorPalette._9bb6ea)}`,
        '&:hover':       {
          boxShadow: 'none',
          color:     ColorPalette._386dd6,
          border:    `1px solid ${ColorPalette._0047d3}`,
        },
        ...props.sx,
      } as MuiButtonProps['sx']}
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
    case 'small3':
      return (<Small3Button {...props} />);
  }
}