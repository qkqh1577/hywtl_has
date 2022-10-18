import { Box } from '@mui/material';
import React from 'react';
import Basic from './Basic';
import Estimate from './Estimate';

export default function ProjectContractModalLeftForm() {

  return (
    <Box sx={{
      width:        '40%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
      height:       '100%',
      padding:      '10px',
    }}>
      <Basic />
      <Estimate />
    </Box>
  );
}