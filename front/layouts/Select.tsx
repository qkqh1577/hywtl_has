import {
  Select as MuiSelect,
  SelectProps
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';

interface Props
  extends Omit<SelectProps, | 'fullWidth' | 'sx' | 'MenuProps'> {
  MenuProps?: Omit<SelectProps['MenuProps'], |'sx'>;
}

export default function Select(props: Props) {

  if (props.variant === 'outlined') {
    return (
      <OutlinedSelect
        {...props}
      />
    );
  }
  return (
    <StandardSelect
      {...props}
    />
  );
}

export function OutlinedSelect(props: SelectProps) {

  return (
    <MuiSelect
      {...props}
      fullWidth
      variant="outlined"
      sx={{
        height:               '32px',
        fontSize:             '13px',
        fontFamily:           'Noto Sans KR',
        color:                props.defaultValue || props.value ? ColorPalette._252627 : ColorPalette._b2b4b7,
        border:               `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:         '5px',
        backgroundColor:      ColorPalette._ffffff,
        '& .MuiSvgIcon-root': {
          color: ColorPalette._386dd6,
        },
        '&::after':           {
          borderBottom: `1px solid ${ColorPalette._0047d3}`,
        },
        '&:hover::before':    {
          borderBottom: `1px solid ${ColorPalette._0047d3} !important`,
        },
        '&:hover > fieldset': {
          borderColor: `${ColorPalette._0047d3} !important`
        },
        '& > fieldset':       {
          border: 'none !important',
        },
      }}
      MenuProps={{
        ...props.MenuProps,
        sx: {
          '& > .MuiMenu-paper': {
            marginTop:    '-8px',
            marginLeft:   '8px',
            overflowY:    'scroll',
            borderRadius: '5px',
            boxShadow:    `2px 2px 10px 0px ${ColorPalette._b2b4b7}`,
            maxHeight:    `${28 * 5}px`,

            '& > ul':      {
              padding:      0,
              borderRadius: '5px 0 0 5px',
            },
            '& > ul > li': {
              fontSize:   '13px',
              color:      ColorPalette._252627,
              minHeight:  '28px',
              padding:    '0 10px',
              wordBreak:  'break-all',
              whiteSpace: 'break-spaces',
            },

            '&::-webkit-scrollbar':       {
              width:           '10px',
              backgroundColor: ColorPalette._e4e9f2,
              borderRadius:    '0 5px 5px 0',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: ColorPalette._697183,
              borderRadius:    '0 5px 5px 0',
            }
          },
        }
      }}
    />
  );
}

export function StandardSelect(props: Props) {

  return (
    <MuiSelect
      {...props}
      fullWidth
      variant="standard"
      sx={{
        height:               '40px',
        fontSize:             '13px',
        fontFamily:           'Noto Sans KR',
        color:                props.defaultValue || props.value ? ColorPalette._252627 : ColorPalette._b2b4b7,
        border:               'none',
        borderBottom:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:         0,
        backgroundColor:      ColorPalette._ffffff,
        '& .MuiSvgIcon-root': {
          color: ColorPalette._386dd6,
        },
        '&::after':           {
          borderBottom: `1px solid ${ColorPalette._0047d3}`,
        },
        '&:hover::before':    {
          borderBottom: `1px solid ${ColorPalette._0047d3} !important`,
        },
        '&:hover > fieldset': {
          borderColor: `${ColorPalette._0047d3} !important`
        },
        '& > fieldset':       {
          border: 'none !important',
        },
      }}
      MenuProps={{
        sx: {
          '& > .MuiMenu-paper': {
            marginTop:    '8px',
            marginLeft:   0,
            overflowY:    'scroll',
            borderRadius: '5px',
            boxShadow:    `2px 2px 10px 0px ${ColorPalette._b2b4b7}`,
            maxHeight:    `${28 * 5}px`,

            '& > ul':      {
              padding:      0,
              borderRadius: '5px 0 0 5px',
            },
            '& > ul > li': {
              fontSize:   '13px',
              color:      ColorPalette._252627,
              minHeight:  '28px',
              padding:    '0 10px',
              wordBreak:  'break-all',
              whiteSpace: 'break-spaces',
            },

            '&::-webkit-scrollbar':       {
              width:           '10px',
              backgroundColor: ColorPalette._e4e9f2,
              borderRadius:    '0 5px 5px 0',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: ColorPalette._697183,
              borderRadius:    '0 5px 5px 0',
            }
          },
        }
      }}
    />
  );
}