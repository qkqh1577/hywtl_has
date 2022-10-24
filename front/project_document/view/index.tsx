import React from 'react';
import { Box, } from '@mui/material';
import {
  ProjectDocumentShortVO,
  ProjectDocumentType,
} from 'project_document/domain';
import ProjectDocumentSection from 'project_document/view/Section';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project_document/route';

interface Props {
  onAddModalOpen: OnAddModalOpen;
  onDetailModalOpen: OnDetailModalOpen;
  receivedList: ProjectDocumentShortVO[] | undefined;
  sentList: ProjectDocumentShortVO[] | undefined;
  buildingList: ProjectDocumentShortVO[] | undefined;
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
