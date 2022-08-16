import React from 'react';
import {
  Box,
  ButtonProps,
  IconButton as MuiIconButton,
} from '@mui/material';
import Tooltip from 'components/Tooltip';

interface Props {
  size?: number;
  onClick: ButtonProps['onClick'];
  children: React.ReactNode;
  tooltip?: string;
}

export default function IconButton(props: Props) {

  return (
    <Box sx={{
      display:         'flex',
      justifyContent:  'center',
      alignContent:    'center',
      alignItems:      'center',
      width:           `${props.size ?? 36}px`,
      height:          `${props.size ?? 36}px`,
      backgroundColor: '#c4baf5',
      borderRadius:    '4px'
    }}>
      <Tooltip title={props.tooltip}>
        <MuiIconButton
          onClick={props.onClick}
          sx={{
            display:         'flex',
            width:           `${(props.size ?? 36) - 20}px`,
            height:          `${(props.size ?? 36) - 20}px`,
            backgroundColor: 'transparent',
            border:          '2px solid #301a9a',
          }}>
          {props.children}
        </MuiIconButton>
      </Tooltip>
    </Box>
  );
}