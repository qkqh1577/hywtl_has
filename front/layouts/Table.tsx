import {
  Table as MuiTable,
  TableCell as MuiTableCell,
  TableCellProps,
  TableProps,
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';

interface ThProps
  extends Omit<TableCellProps, |'variant'> {
  backgroundColor?: string;
}

export function Th({ backgroundColor, ...props }: ThProps) {

  return (
    <MuiTableCell
      {...props}
      variant="head"
      sx={{
        ...props.sx,
        backgroundColor: backgroundColor ?? 'transparent',
        borderBottom:    'none',
        borderLeft:      `1px solid ${ColorPalette._e4e9f2}`,
        borderTop:       `1px solid ${ColorPalette._e4e9f2}`,
        color:           ColorPalette._252627,
        fontSize:        '13px',
        fontWeight:      'bold',
        height:          '40px',
        padding:         '0 10px',
        textAlign:       'center',
      }}
    />
  );
}

interface TdProps
  extends TableCellProps {
  variant?: 'body' | 'footer';
}

export function Td(props: TdProps) {
  return (
    <MuiTableCell
      {...props}
      variant={props.variant ?? 'body'}
      align={props.align ?? 'center'}
      sx={{
        ...props.sx,
        backgroundColor: 'transparent',
        borderBottom:    'none',
        borderLeft:      `1px solid ${ColorPalette._e4e9f2}`,
        borderTop:       `1px solid ${ColorPalette._e4e9f2}`,
        color:           ColorPalette._252627,
        fontSize:        '13px',
        height:          '40px',
        padding:         '0 10px',
      }}
    />
  );
}

export function Table(props: TableProps) {

  return (
    <MuiTable
      stickyHeader
      aria-label="sticky table"
      sx={{
        ...(props.sx ?? {}),
        backgroundColor: ColorPalette.White,
        borderRadius:    '5px',
        '& > thead':     {
          '& > tr:first-of-type': {
            '& > th:first-of-type': {
              borderTopLeftRadius: '5px',
            },
            '& > th:last-child':    {
              borderRight:          `1px solid ${ColorPalette._e4e9f2}`,
              borderTopRightRadius: '5px',
            },
          },
          '& > tr:last-child':    {
            '& > th': {
              borderBottom: `5px solid ${ColorPalette._e4e9f2}`,
              padding:      0,
            }
          }
        },
        '& > tbody':     {
          '& > tr >  td:last-child': {
            borderRight: `1px solid ${ColorPalette._e4e9f2}`,
          },
          '& >tr:last-child':        {
            '& > td':               {
              borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
            },
            '& > td:first-of-type': {
              borderBottom:           `1px solid ${ColorPalette._e4e9f2}`,
              borderBottomLeftRadius: '5px',
            },
            '& > td:last-child':    {
              borderBottom:            `1px solid ${ColorPalette._e4e9f2}`,
              borderBottomRightRadius: '5px',
            },
          }
        },
      }}
      {...props}
    />
  );
}