import PageLayout from 'layouts/PageLayout';
import React from 'react';
import { Box } from '@mui/material';
import ProjectContainerTitleButtonBar from 'project/view/Container/TitleButtonBar';
import ProjectContainerTab from 'project/view/Container/Tab';
import ProjectAddModal, { AddModalProps } from 'project/view/AddModal';

interface Props {
  children: React.ReactNode;
  statusBar: React.ReactNode;
  title: React.ReactNode;
  addModalProps: AddModalProps;
}

export default function ProjectContainer(props: Props) {

  return (
    <PageLayout
      title={props.title}
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
      modals={[
        <ProjectAddModal {...props.addModalProps} />
      ]}
    />
  );
}