import { Divider as MuiDivider } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import React from 'react';

export default function Divider() {
  return (
    <MuiDivider
      sx={{
        width:        '100%',
        padding:      '0 20px',
        margin:       '20px 0',
        border:       'none',
        borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
      }}
    />
  );
}