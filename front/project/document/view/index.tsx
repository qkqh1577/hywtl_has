import React from 'react';
import {
  Box,
  Grid,
  Paper
} from '@mui/material';
import Header from 'project/document/view/Header';
import List, { ListProps } from 'project/document/view/List';
import {
  ProjectDocumentId,
  ProjectDocumentType,
} from 'project/document/domain';
import ProjectDocumentModal, { ProjectDocumentModalProps } from 'project/document/view/Modals/AddModal';
import ProjectDocumentDetailModal, { ProjectDocumentDetailModalProps } from 'project/document/view/Modals/DetailModal';

interface Props
  extends ListProps {
  addModalProps: ProjectDocumentModalProps;
  onAddModalOpen: (type: ProjectDocumentType) => void;
  detailModalProps: ProjectDocumentDetailModalProps;
  onDetailModalOpen: (id: ProjectDocumentId) => void;
}

export default function ProjectDocument({
                                          receivedList,
                                          sentList,
                                          buildingList,
                                          addModalProps,
                                          onAddModalOpen,
                                          detailModalProps,
                                          onDetailModalOpen,
                                        }: Props) {
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Header type={ProjectDocumentType.RECEIVED} onAddModalOpen={onAddModalOpen} />
          <List receivedList={receivedList} onDetailModalOpen={onDetailModalOpen}/>
        </Grid>
        <Grid item sm={12}>
          <Header type={ProjectDocumentType.SENT} onAddModalOpen={onAddModalOpen} />
          <List sentList={sentList} onDetailModalOpen={onDetailModalOpen} />
        </Grid>
        <Grid item sm={12}>
          <Header type={ProjectDocumentType.BUILDING} onAddModalOpen={onAddModalOpen} />
          <List buildingList={buildingList} onDetailModalOpen={onDetailModalOpen} />
        </Grid>
      </Grid>
      <Paper sx={{
        width:    '100%',
        overflow: 'hidden'
      }}>
        <ProjectDocumentModal
          open={addModalProps.open}
          onSubmit={addModalProps.onSubmit}
          onClose={addModalProps.onClose}
          formik={addModalProps.formik}
        />
      </Paper>
      <Paper sx={{
        width:    '100%',
        overflow: 'hidden'
      }}>
        <ProjectDocumentDetailModal
          open={detailModalProps.open}
          onClose={detailModalProps.onClose}
          onEdit={detailModalProps.onEdit}
          onDelete={detailModalProps.onDelete}
          detail = {detailModalProps.detail}
        />
      </Paper>
    </Box>
  );
};
