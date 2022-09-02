import {
  Table as MuiTable,
  TableProps,
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';

export function Table(props: TableProps) {

  return (
    <MuiTable
      stickyHeader
      aria-label="sticky table"
      sx={{
        ...(props.sx ?? {}),
        backgroundColor:                               ColorPalette.White,
        borderRadius:                                  '5px',
        '& th, & td':                                  {
          textAlign:       'center',
          fontSize:        '13px',
          height:          '40px',
          padding:         '0 10px',
          backgroundColor: 'transparent',
          borderLeft:      `1px solid ${ColorPalette._e4e9f2}`,
          borderTop:       `1px solid ${ColorPalette._e4e9f2}`,
          borderBottom:    'none',
          color:           ColorPalette._252627,
        },
        '& th':                                        {
          fontWeight:      'bold',
          borderBottom:    `5px solid ${ColorPalette._e4e9f2}`,
          backgroundColor: ColorPalette._fff,
          padding:         0,
        },
        '& th:first-of-type':                          {
          borderTopLeftRadius: '5px',
        },
        '& th:last-child':                             {
          borderRight:          `1px solid ${ColorPalette._e4e9f2}`,
          borderTopRightRadius: '5px',
        },
        '& td:last-child':                             {
          borderRight: `1px solid ${ColorPalette._e4e9f2}`,
        },
        '& tbody > tr:first-of-type > td ':            {
          borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
        },
        '& tbody > tr:last-child > td:first-of-type ': {
          borderBottom:           `1px solid ${ColorPalette._e4e9f2}`,
          borderBottomLeftRadius: '5px',
        },
        '& tbody > tr:last-child > td:last-child ':    {
          borderBottom:            `1px solid ${ColorPalette._e4e9f2}`,
          borderBottomRightRadius: '5px',
        },
      }}
      {...props}
    />
  );
}
