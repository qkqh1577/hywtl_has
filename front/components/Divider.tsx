import React from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { DividerProps } from '@mui/material/Divider/Divider';

const Divider = (props: DividerProps) => {
  const { sx, variant = 'middle', ...rest } = props;
  return <MuiDivider
    {...rest}
    variant={variant}
    sx={{
      m:     '8px',
      width: '100%',
      ...(sx ?? {})
    }}
  />;
};
export default Divider;
