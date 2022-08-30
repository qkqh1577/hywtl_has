import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';

export interface HeaderProps {
  title: string;
  modifiedAt?: Date;
}

export default function Header({title, modifiedAt}: HeaderProps) {
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
    }}>
      <Box>
        <Typography>{title}</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Button>+등록</Button>
        <Typography>{modifiedAt}</Typography>
      </Box>
    </Box>
  );
};
