import React from 'react';
import { Box } from '@mui/material';

interface FieldBoxProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

export default function FieldBox(props: FieldBoxProps) {
  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'wrap',
      marginBottom: '15px',
    }}
    >
      <Box sx={{
        width:        '100%',
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '5px',
      }}>
        {props.label}
      </Box>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'nowrap',
      }}>
        {props.children}
      </Box>
    </Box>
  );
}