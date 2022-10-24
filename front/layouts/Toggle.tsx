import React from 'react';
import { Switch } from '@mui/material';
import { SwitchProps } from '@mui/material/Switch/Switch';
import { ColorPalette } from 'assets/theme';


interface Props
  extends Omit<SwitchProps,
    | 'checkedIcon'
    | 'color'
    | 'size'> {
  onText?: string;
  offText?: string;
}

export default function Toggle({
                                 onText = '',
                                 offText = '',
                                 ...props
                               }: Props) {

  return (
    <Switch
      {...props}
      sx={{
        ...props.sx,
        width:                       '76px',
        height:                      '26px',
        padding:                     0,
        borderRadius:                '50px',
        '& > .MuiSwitch-switchBase': {
          padding:                0,
          width:                  '26px',
          height:                 '26px',
          '&.Mui-checked':        {
            transform: 'translateX(50px) !important',
          },
          '& > .MuiSwitch-thumb': {
            backgroundColor: `${ColorPalette._ffffff} !important`,
            width:           '24px',
            height:          '24px',
          }
        },
        '& > .MuiSwitch-track':      {
          opacity:             `1 !important`,
          backgroundColor:     `${props.checked ? ColorPalette._386dd6 : ColorPalette._e4e9f2} !important`,
          '&:before, &:after': {
            fontFamily: 'Noto Sans KR',
            top:        '50%',
            transform:  'translateY(-50%)',
            height:     '26px',
            lineHeight: '24px',
            fontSize:   '12px',
          },
          '&:before':          {
            content:  `"${onText}"`,
            color:    ColorPalette._ffffff,
            left:     '10px',
            position: 'absolute',
            opacity:  props.checked ? 1 : 0,
          },
          '&:after':           {
            content:  `"${offText}"`,
            color:    ColorPalette._386dd6,
            right:    '10px',
            position: 'absolute',
            opacity:  props.checked ? 0 : 1,
          }
        },
      }}
    />
  );
}