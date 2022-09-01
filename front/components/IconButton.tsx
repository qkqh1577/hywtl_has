import React from 'react';
import {
  Button,
  ButtonProps,
  IconButton as MuiIconButton,
} from '@mui/material';
import Tooltip from 'components/Tooltip';
import { ColorPalette } from 'app/view/App/theme';

interface Props {
  onClick: ButtonProps['onClick'];
  tooltip?: string;
  disabled?: boolean;
  children: React.ReactNode;
  size?: string;
  sx?: ButtonProps['sx'];
  shape?: 'round' | 'square';
}

function SquareIconButton(props: Props) {
  const {
          children,
          onClick,
          disabled,
          size,
          sx,
        } = props;
  return (
    <Button
      sx={{
        ...sx,
        display:         'flex',
        justifyContent:  'center',
        flexWrap:        'nowrap',
        alignItems:      'center',
        minWidth:        0,
        fontSize:        '13px',
        width:           size ?? '32px',
        height:          size ?? '32px',
        color:           ColorPalette._fff,
        backgroundColor: ColorPalette._386dd6,
        borderRadius:    '5px',
        marginLeft:      '10px',
        boxShadow:       0,
        '&:hover':       {
          backgroundColor: ColorPalette._0047d3,
        }
      }}
      disabled={disabled}
      onClick={onClick}
      children={children}
    />
  );

}

function RoundIconButton(props: Props) {
  const {
          children,
          onClick,
          disabled,
          size,
          sx,
        } = props;

  return (
    <MuiIconButton
      sx={{
        ...sx,
        fontSize:        '11px',
        width:           size ?? '22px',
        height:          size ?? '22px',
        color:           ColorPalette._fff,
        backgroundColor: ColorPalette._4c9eeb,
        marginLeft:      '10px',
        '&:hover':       {
          backgroundColor: ColorPalette._0047d3,
        }
      }}
      disabled={disabled}
      onClick={onClick}
      children={children}
    />
  );

}

export default function IconButton(props: Props) {
  const { shape, tooltip } = props;

  const icon = shape === 'square'
    ? <SquareIconButton {...props} />
    : <RoundIconButton {...props} />;

  if (!tooltip) {
    return icon;
  }
  return (
    <Tooltip
      title={tooltip}
      children={icon}
    />
  );
}
