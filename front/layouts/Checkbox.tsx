import React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';

interface Props
  extends Omit<CheckboxProps, | 'checkedIcon'> {

}

export default function Checkbox(props: Props) {


  return (
    <MuiCheckbox
      {...props}
      checkedIcon={<FontAwesomeIcon icon="check" />}
      sx={{
        ...props.sx,
        width:        '22px',
        height:       '22px',
        borderRadius: '5px',
        overflow:     'hidden',
        border:       `1px solid ${props.defaultChecked || props.checked ? (props.disabled ? ColorPalette._e4e9f2 : ColorPalette._9bb6ea) : ColorPalette._e4e9f2}`,
        '&:hover':    {
          border: props.disabled ? ColorPalette._e4e9f2 : `1px solid ${ColorPalette._0047d3}`,
        },
        '& > svg':    {
          backgroundColor: `${ColorPalette._ffffff} !important`,
          color:           `${props.defaultChecked || props.checked ? (props.disabled ? ColorPalette._e4e9f2 : ColorPalette._386dd6) : ColorPalette._ffffff} !important`,
        }
      }}
    />
  );
}