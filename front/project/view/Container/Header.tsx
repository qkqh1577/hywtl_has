import React from 'react';
import { Box } from '@mui/material';
import ProjectContainerTab from './Tab';

interface Props {
  statusBar: React.ReactNode;
}

export default function ProjectContainerHeader({ statusBar }: Props) {

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      {statusBar}
      <ProjectContainerTab />
    </Box>
  );
}
