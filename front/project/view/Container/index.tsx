import PageLayout from 'layouts/PageLayout';
import React from 'react';
import { Box } from '@mui/material';
import ProjectContainerTitle from 'project/view/Container/Title';
import ProjectContainerTitleButtonBar from 'project/view/Container/TitleButtonBar';
import ProjectContainerTab from 'project/view/Container/Tab';

interface Props {
  children: React.ReactNode;
  statusBar: React.ReactNode;
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
          {props.statusBar}
          <ProjectContainerTab />
        </Box>
      }
      body={props.children}
    />
  );
}