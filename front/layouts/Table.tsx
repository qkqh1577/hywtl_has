import {
  Table as MuiTable,
  TableProps,
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';

export function Table(props: TableProps) {

  return (
    <MuiTable
      sx={{
        backgroundColor: ColorPalette.White,
        borderLeft:      `1px solid ${ColorPalette.Blue['7']}`,
        borderTop:       `1px solid ${ColorPalette.Blue['7']}`,
        borderRadius:    '5px',

        '& th, & td':      {
          textAlign:       'center',
          fontSize:        '13px',
          height:          '40px',
          padding:         '0 10px',
          backgroundColor: 'transparent',
          color:           ColorPalette.DarkGray,
        },
        '& th':            {
          fontWeight:   'bold',
          borderBottom: `5px solid ${ColorPalette.Blue['7']}`,
        },
        '& th:last-child': {
          borderRight: `1px solid ${ColorPalette.Blue['7']}`,
        },
        '& td':            {
          borderRight:  `1px solid ${ColorPalette.Blue['7']}`,
          borderBottom: `1px solid ${ColorPalette.Blue['7']}`,
        },
        ...(props.sx ?? {}),

      }}
      {...props}
    />
  );
}
