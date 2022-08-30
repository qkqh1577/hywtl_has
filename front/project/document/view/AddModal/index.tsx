import ProjectDocumentModalButtonBlock, { ProjectDocumentModalButtonBlockProps } from 'project/document/view/AddModal/ButtonBlock';
import ModalLayout from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import React from 'react';
import Form from 'project/document/view/AddModal/Form';

export interface ProjectDocumentModalProps
  extends ProjectDocumentModalButtonBlockProps {
  open: boolean;
}

export default function ProjectDocumentModal({
                                               open,
                                               onSubmit,
                                               onClose,
                                             }: ProjectDocumentModalProps) {
  return (
    <ModalLayout
      title="자료 등록"
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <Form />
          <ProjectDocumentModalButtonBlock
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </Box>
      }
    />
  );
}
