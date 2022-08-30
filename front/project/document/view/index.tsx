import React from 'react';
import {
  Box,
  Grid,
  Paper
} from '@mui/material';
import Header, { HeaderProps } from 'project/document/view/Header';
import List, { ListProps } from 'project/document/view/List';
import ProjectDocumentModal, { ProjectDocumentModalProps } from 'project/document/view/AddModal';

interface Props
  extends ListProps,
          HeaderProps {
  modalProps: ProjectDocumentModalProps;
}

export default function ProjectDocument({ receivedList, sentList, buildingList, onModalOpen, modalProps }: Props) {
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Header title="받은 자료" onModalOpen={onModalOpen} />
          <List receivedList={receivedList} />
        </Grid>
        <Grid item sm={12}>
          <Header title="보낸 자료" onModalOpen={onModalOpen} />
          <List sentList={sentList} />
        </Grid>
        <Grid item sm={12}>
          <Header title="형상비검토 자료" onModalOpen={onModalOpen} />
          <List buildingList={buildingList} />
        </Grid>
      </Grid>
      <Paper sx={{
        width:    '100%',
        overflow: 'hidden'
      }}>
        <ProjectDocumentModal open={modalProps.open} onSubmit={modalProps.onSubmit} onClose={modalProps.onClose} />
      </Paper>
    </Box>
  );
};
