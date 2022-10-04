import React from 'react';
import { Box } from '@mui/material';
import ProjectContainerTab from './Tab';
import { ProjectContainerStatusBar } from 'project/view/Container/StatusBar';

interface Props {
  status: React.ReactNode;
}

export default function ProjectContainerHeader({ status }: Props) {

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <ProjectContainerStatusBar status={status} />
      <ProjectContainerTab />
    </Box>
  );
}
