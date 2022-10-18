import { Box } from '@mui/material';
import React from 'react';
import Basic from './Basic';
import Description from './Description';
import ContractDate from './ContractDate';
import Orderer from './Orderer';
import Contractor from './Contractor';
import Condition from './Condition';

export default function ProjectContractModalRightForm() {

  return (
    <Box sx={{
      width:        '60%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
      padding:      '10px',
      overflowX:    'hidden',
    }}>
      <Basic />
      <Description />
      <ContractDate />
      <Orderer />
      <Contractor />
      <Condition />
    </Box>
  );
}