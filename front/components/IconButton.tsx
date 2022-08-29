import React from 'react';
import {
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
}

export default function IconButton({ children, onClick, tooltip, disabled }: Props) {

  const icon = (
    <MuiIconButton
      sx={{
        fontSize:        '11px',
        width:           '22px',
        height:          '22px',
        color:           ColorPalette.White,
        backgroundColor: ColorPalette.Blue['2'],
        marginLeft:      '10px'
      }}
      disabled={disabled}
      onClick={onClick}
      children={children}
    />
  );

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