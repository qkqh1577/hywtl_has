import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

interface Props {
  code?: string;
  name?: string;
}

export default function ProjectContainerTitle({ name, code }: Props) {
  return (
    <Box sx={{
      display: 'flex',
      width:   '100%',
      height:  '100%'
    }}>
      <Typography variant="h5" fontWeight={600}>
        {name && '['}
        {name && !code ? '가등록' : code}
        {name && ']'}
      </Typography>
      <Typography variant="h5">{name}</Typography>
    </Box>
  );
}