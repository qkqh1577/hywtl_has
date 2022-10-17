import { Box } from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';


export default function ProjectContractModalLeftEstimateForm() {

  return (
    <Box sx={{
      display:      'flex',
      flexWrap:     'wrap',
      width:        '100%',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
      height:       '200px',
      margin:       '10px 0px',
      padding:      '10px',
    }}>
      견적서
    </Box>
  );
}