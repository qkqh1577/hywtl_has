import { Divider as MuiDivider } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import React from 'react';
import {SxProps} from "@mui/system";

interface DividerProps{
  sx?: SxProps
}

export default function Divider(props: DividerProps) {
  return (
    <MuiDivider
      sx={{
        width:        '100%',
        padding:      '0 20px',
        margin:       '20px 0',
        border:       'none',
        borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
        ...props?.sx,
      }}
    />
  );
}