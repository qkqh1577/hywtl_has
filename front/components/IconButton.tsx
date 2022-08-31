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
  size?: string;
}

export default function IconButton({ children, onClick, tooltip, disabled, size }: Props) {

  const icon = (
    <MuiIconButton
      sx={{
        fontSize:        '11px',
        width:           size ?? '22px',
        height:          size ?? '22px',
        color:           ColorPalette._fff,
        backgroundColor: ColorPalette._4c9eeb,
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