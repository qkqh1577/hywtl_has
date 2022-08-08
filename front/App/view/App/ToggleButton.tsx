import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import React from 'react';
import { IconButton } from '@mui/material';
import useMenu from 'App/service/menuHook';

export default function () {

  const { open, toggleMenu } = useMenu();

  const onClick = () => {
    toggleMenu();
  };
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