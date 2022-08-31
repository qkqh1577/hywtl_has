import React from 'react';
import {
  Box,
  Grid,
  Paper
} from '@mui/material';
import Header from 'project/document/view/Header';
import List, { ListProps } from 'project/document/view/List';
import ProjectDocumentModal, { ProjectDocumentModalProps } from 'project/document/view/AddModal';
import { ProjectDocumentType } from 'project/document/domain';

interface Props
  extends ListProps {
  modalProps: ProjectDocumentModalProps;
  onModalOpen: (type: ProjectDocumentType) => void;
}

export default function ProjectDocument({
                                          receivedList,
                                          sentList,
                                          buildingList,
                                          onModalOpen,
                                          modalProps
                                        }: Props) {
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Header type={ProjectDocumentType.RECEIVED} onModalOpen={onModalOpen} />
          <List receivedList={receivedList} />
        </Grid>
        <Grid item sm={12}>
          <Header type={ProjectDocumentType.SENT} onModalOpen={onModalOpen} />
          <List sentList={sentList} />
        </Grid>
        <Grid item sm={12}>
          <Header type={ProjectDocumentType.BUILDING} onModalOpen={onModalOpen} />
          <List buildingList={buildingList} />
        </Grid>
      </Grid>
      <Paper sx={{
        width:    '100%',
        overflow: 'hidden'
      }}>
        <ProjectDocumentModal
          open={modalProps.open}
          onSubmit={modalProps.onSubmit}
          onClose={modalProps.onClose}
          formik={modalProps.formik}
        />
      </Paper>
    </Box>
  );
};
