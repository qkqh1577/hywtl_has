import PageLayout from 'layouts/PageLayout';
import ProjectContainerStatusBar from 'project/view/Container/Status';
import React from 'react';
import ProjectContainerTab from 'project/view/Container/Tab';
import { Box } from '@mui/material';
import ProjectContainerTitle from 'project/view/Container/Title';
import ProjectContainerTitleButtonBar from 'project/view/Container/TitleButtonBar';

interface Props {
  children: React.ReactNode;
}

export default function ProjectContainer(props: Props) {

  return (
    <PageLayout
      title={<ProjectContainerTitle />}
      titleRightComponent={<ProjectContainerTitleButtonBar />}
      filter={
        <Box sx={{
          border:   '1px solid #0000001f',
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',

        }}>
          <ProjectContainerStatusBar />
          <ProjectContainerTab />
        </Box>
      }
      body={props.children}
    />
  );
}