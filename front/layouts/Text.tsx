import React from 'react';
import {
  Typography,
  TypographyProps
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export type TextVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
  | 'body6'
  | 'body7'
  | 'body8'
  | 'body9'
  | 'body10'
  | 'body11'
  | 'body12'
  | 'body13'
  | 'body14'
  | 'body15'
  | 'body16'
  | 'body17'
  | 'body18'
  | 'body19'
  | 'body20'
  | 'body21'
  | 'menu'

interface Props
  extends Omit<TypographyProps, | 'variant'> {
  variant: TextVariant;
}


function makeStyle(variant: TextVariant): SxProps<Theme> {

  switch (variant) {
    case 'heading1':
      return {
        fontWeight: 'bolder',
        fontSize:   '18px',
        lineHeight: '26px',
        color:      ColorPalette._252627,
      };
    case 'heading2':
      return {
        fontWeight: 'bold',
        fontSize:   '18px',
        lineHeight: '26px',
        color:      ColorPalette._ffffff,
      };
    case'heading3':
      return {
        fontWeight: 'bolder',
        fontSize:   '14px',
        lineHeight: '22px',
        color:      ColorPalette._252627,
      };
    case 'heading4':
      return {
        fontWeight: 'bold',
        fontSize:   '14px',
        lineHeight: '22px',
        color:      ColorPalette._252627,
      };
    case 'body1':
      return {
        fontWeight: 'bold',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._252627,
      };
    case 'body2':
      return {
        fontWeight: 'normal',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._252627,
      };
    case 'body3':
      return {
        fontWeight: 'normal',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._b2b4b7,
      };
    case 'body4':
      return {
        fontWeight: 'bold',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._9b9ea4,
        wordBreak:  'keep-all',
        whiteSpace: 'nowrap',
      };
    case 'body5':
      return {
        fontWeight: 'bold',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._386dd6,
      };
    case 'body6':
      return {
        fontWeight: 'bold',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._ffffff,
      };
    case 'body7':
      return {
        fontWeight: 'bolder',
        fontSize:   '12px',
        lineHeight: '18px',
        color:      ColorPalette._252627,
      };
    case 'body8':
      return {
        fontWeight: 'bold',
        fontSize:   '12px',
        lineHeight: '18px',
        color:      ColorPalette._252627,
      };
    case 'body9':
      return {
        fontWeight: 'normal',
        fontSize:   '12px',
        lineHeight: '18px',
        color:      ColorPalette._252627,
      };
    case 'body10':
      return {
        fontWeight: 'normal',
        fontSize:   '12px',
        lineHeight: '18px',
        color:      ColorPalette._386dd6,
      };
    case 'body11':
      return {
        fontWeight: 'bold',
        fontSize:   '11px',
        lineHeight: '16px',
        color:      ColorPalette._252627,
      };
    case 'body12':
      return {
        fontWeight: 'normal',
        fontSize:   '11px',
        lineHeight: '16px',
        color:      ColorPalette._b2b4b7,
      };
    case 'body13':
      return {
        fontWeight: 'normal',
        fontSize:   '11px',
        lineHeight: '16px',
        color:      ColorPalette._386dd6,
      };
    case 'body14':
      return {
        fontWeight: 'bold',
        fontSize:   '12px',
        lineHeight: '18px',
        color:      ColorPalette._ffffff,
      };
    case 'body15':
      return {
        fontWeight: 'normal',
        fontSize:   '18px',
        lineHeight: '26px',
        color:      ColorPalette._252627,
      };
    case 'body16':
      return {
        fontWeight: 'bold',
        fontSize:   '14px',
        lineHeight: '22px',
        color:      ColorPalette._a7abb2,
      };
    case 'body17':
      return {
        fontWeight: 'bolder',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._ffffff,
      };
    case 'body18':
      return {
        fontWeight: 'bolder',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._386dd6,
      };
    case 'body19':
      return {
        fontWeight: 'bolder',
        fontSize:   '11px',
        lineHeight: '16px',
        color:      ColorPalette._386dd6,
      };
    case 'body20':
      return {
        fontWeight: 'normal',
        fontSize:   '11px',
        lineHeight: '16px',
        color:      ColorPalette._eb4c4c,
      };
    case 'body21':
      return {
        fontWeight: 'normal',
        fontSize:   '9px',
        lineHeight: '16px',
        color:      ColorPalette._386dd6,
      };
    case 'menu':
      return {
        fontWeight: 'bold',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._94a6ca,
        wordBreak:  'keep-all',
        whiteSpace: 'nowrap',
      };
    default:
      return {};
  }
}

export default function TextBox({ variant, sx: customSX, ...props }: Props) {
  const sx = {
    ...makeStyle(variant),
    ...(customSX ?? {}),
  } as SxProps<Theme>;

  return (
    <Typography
      component="span"
      {...props}
      sx={sx}
    />
  );
}
