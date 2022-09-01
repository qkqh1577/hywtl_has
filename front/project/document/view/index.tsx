import React from 'react';
import {
  Box,
} from '@mui/material';
import {
  ProjectDocumentShort,
  ProjectDocumentType,
} from 'project/document/domain';
import ProjectDocumentSection from 'project/document/view/Section';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project/document/route/document';

interface Props {
  addModal: React.ReactNode;
  detailModal: React.ReactNode;
  onAddModalOpen: OnAddModalOpen;
  onDetailModalOpen: OnDetailModalOpen;
  receivedList: ProjectDocumentShort[] | undefined;
  sentList: ProjectDocumentShort[] | undefined;
  buildingList: ProjectDocumentShort[] | undefined;
}

export default function ProjectDocument(props: Props) {
  const {
          receivedList,
          sentList,
          buildingList,
          addModal,
          onAddModalOpen,
          detailModal,
          onDetailModalOpen,
        } = props;
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <ProjectDocumentSection
        type={ProjectDocumentType.RECEIVED}
        list={receivedList}
        onAddModalOpen={onAddModalOpen}
        onDetailModalOpen={onDetailModalOpen}
      />
      <ProjectDocumentSection
        type={ProjectDocumentType.SENT}
        list={sentList}
        onAddModalOpen={onAddModalOpen}
        onDetailModalOpen={onDetailModalOpen}
      />
      <ProjectDocumentSection
        type={ProjectDocumentType.BUILDING}
        list={buildingList}
        onAddModalOpen={onAddModalOpen}
        onDetailModalOpen={onDetailModalOpen}
      />
      {addModal}
      {detailModal}
    </Box>
  );
};
