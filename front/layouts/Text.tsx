import React from 'react';
import {
  Typography,
  TypographyProps
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
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
    case 'menu':
      return {
        fontWeight: 'bold',
        fontSize:   '13px',
        lineHeight: '20px',
        color:      ColorPalette._94a6ca,
      };
    default:
      return {};
  }
}

export default function Text({ variant, sx: customSX, ...props }: Props) {

  const sx = {
    ...(customSX ?? {}),
    ...makeStyle(variant)
  } as SxProps<Theme>;

  return (
    <Typography
      {...props}
      sx={sx}
    />
  );
}