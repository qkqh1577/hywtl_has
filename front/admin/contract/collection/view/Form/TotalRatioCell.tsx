import { Typography } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import React from 'react';

interface Props {
  value: number;
}

export default function (props: Props) {

  return (
    <Typography
      sx={{
        fontSize:   'inherit',
        fontWeight: 'inherit',
        color:      props.value !== 100 ? ColorPalette._eb4c4c : 'inherit',
      }}
    >
      {props.value}
    </Typography>
  );
}