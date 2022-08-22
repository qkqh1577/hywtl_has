import React from 'react';
import { Box } from '@mui/material';
import ProjectContainerTab from './Tab';

interface Props {
  statusBar: React.ReactNode;
}

export default function ({ statusBar }: Props) {

  return (
    <Box sx={{
      border:   '1px solid #0000001f',
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      {statusBar}
      <ProjectContainerTab />
    </Box>
  );
}