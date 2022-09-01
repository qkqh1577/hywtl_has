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
          onAddModalOpen,
          onDetailModalOpen,
        } = props;
  return (
    <Box sx={{
      width: '100%'
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
    </Box>
  );
};
