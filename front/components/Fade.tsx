import React from 'react';
import {
  Fade as MuiFade,
  Paper,
} from '@mui/material';
import { FadeProps } from '@mui/material/Fade/Fade';

type Props = Omit<FadeProps, 'children'> & {
  children: React.ReactNode | React.ReactNode[];
}

const Fade = ({ children, in: open, ...rest }: Props) =>
  <MuiFade in={open} {...rest}>
    <Paper elevation={4} sx={{
      width:           open ? '100%' : 0,
      height:          '100%',
      boxShadow:       'none',
      backgroundColor: 'transparent',
    }}>
      {children}
    </Paper>
  </MuiFade>;

export default Fade;
