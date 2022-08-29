import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';

interface Props {
  code?: string;
  name?: string;
}

export default function ProjectContainerTitle({ name, code }: Props) {

  if (!name) {
    return null;
  }
  return (
    <Box sx={{
      display: 'flex',
      width:   '100%',
      height:  '100%'
    }}>
      <Typography sx={{
        fontSize:   '18px',
        lineHeight: '26px',
        color:      ColorPalette.DarkGray,
        fontWeight: 'bold'
      }}>
        {name && '['}
        {name && !code ? '가등록' : code}
        {name && ']'}
      </Typography>
      <Typography sx={{
        fontSize:   '18px',
        lineHeight: '26px',
        color:      ColorPalette.DarkGray,
        fontWeight: 'bold'
      }}>
        {name}
      </Typography>

    </Box>
  );
}