import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import React from 'react';
import { IconButton } from '@mui/material';

export interface ToggleButtonProps {
  openMenu: boolean;
  toggleMenu: () => void;
}

export default function ({
                           openMenu:   open,
                           toggleMenu: onClick
                         }: ToggleButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        display:         'flex',
        width:           '16.25px',
        height:          '16.25px',
        backgroundColor: 'transparent',
        border:          '2px solid #301a9a',
      }}>
      {open ? <LeftIcon /> : <RightIcon />}
    </IconButton>
  );
}