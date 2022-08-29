import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';

export default function Header() {
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
    }}>
      <Box>
        <Typography>받은 자료</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Button>+등록</Button>
        <Typography>최종수정일시 2022-01-01 10:02</Typography>
      </Box>
    </Box>
  );
};
