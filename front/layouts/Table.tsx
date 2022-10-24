import {
  Table as MuiTable,
  TableCell as MuiTableCell,
  TableCellProps,
  TableProps,
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'assets/theme';

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
        backgroundColor: 'transparent',
        color:           ColorPalette._252627,
        fontSize:        '13px',
        height:          '40px',
        padding:         '0 10px',
        ...props.sx,
      }}
    />
  );
}

interface StyleProps {
  variant?: 'top' | 'left' | 'cross';
  hasFoot?: boolean;
  disableSticky?: boolean;
}

function getStyle(props: StyleProps) {

  const crossStyle = {
    '& > thead': {
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
        }
      },
      '& > tr > th':          {
        backgroundColor: ColorPalette._e4e9f2,
      }
    },
    '& > tbody': {
      '& > tr':            {
        '& > td:first-of-type': {
          borderRight: `5px solid ${ColorPalette._e4e9f2}`
        },
        '& > td:last-child':    {
          borderRight: `1px solid ${ColorPalette._e4e9f2}`,
        },
      },
      '& > tr:last-child': {
        '& > td:first-of-type': {
          borderBottomLeftRadius: '5px',
        },
        '& > td':               {
          borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
        },
        '& > td:last-child':    {
          borderBottomRightRadius: '5px',
        },
      },
    }
  };

  const leftStyle = {
    '& > tbody': {
      '& > tr:first-of-type': {
        '& > td:first-of-type': {
          borderTopLeftRadius: '5px',
        },
        '& > td:last-child':    {
          borderTopRightRadius: '5px',
        },
      },
      '& > tr':               {
        '& > td:first-of-type': {
          borderRight: `5px solid ${ColorPalette._e4e9f2}`
        },
        '& > td:last-child':    {
          borderRight: `1px solid ${ColorPalette._e4e9f2}`,
        },
      },
      '& > tr:last-child':    {
        '& > td:first-of-type': {
          borderBottomLeftRadius: '5px',
        },
        '& > td':               {
          borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
        },
        '& > td:last-child':    {
          borderBottomRightRadius: '5px',
        },
      },
    }
  };
  const topStyle = {
    '& > thead': {
      '& > tr > th':          {
        backgroundColor: ColorPalette._ffffff,
      },
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
        }
      }
    },
    '& > tbody': {
      '& > tr > td:last-child': {
        borderRight: `1px solid ${ColorPalette._e4e9f2}`,
      },
      '& > tr:last-child':      props.hasFoot ? undefined : {
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
    '& > tfoot': {
      '& > tr > td:last-child': {
        borderRight: `1px solid ${ColorPalette._e4e9f2}`,
      },
      '& > tr:last-child':      {
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
  };
  if (props.variant === 'left') {
    return leftStyle;
  }
  if (props.variant === 'cross') {
    return crossStyle;
  }

  return topStyle;
}

export function Table({
                        disableSticky,
                        variant,
                        hasFoot,
                        ...props
                      }: TableProps & StyleProps) {
  const width = props.sx && (props.sx as any).width ? (props.sx as any).width : (variant === 'left' ? 'unset' : '100%');
  return (
    <MuiTable
      {...props}
      stickyHeader={!disableSticky}
      aria-label={disableSticky ? undefined : 'sticky table'}
      sx={{
        width,
        backgroundColor: ColorPalette._ffffff,
        borderRadius:    '5px',
        '& td, & th':    {
          borderLeft: `1px solid ${ColorPalette._e4e9f2}`,
          borderTop:  `1px solid ${ColorPalette._e4e9f2}`,
        },
        ...getStyle({ variant, hasFoot }),
      }}
    />
  );
}