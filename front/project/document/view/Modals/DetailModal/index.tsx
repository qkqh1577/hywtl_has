import { FormikProvider } from 'formik';
import { Box } from '@mui/material';
import ModalLayout from 'layouts/ModalLayout';
import React from 'react';
import ProjectDocumentDetailModalButtonBlock, { ProjectDocumentDetailModalButtonBlockProps } from 'project/document/view/Modals/DetailModal/ProjectDocumentDetailModalButtonBlock';
import Form, { ProjectDocumentFormProps } from 'project/document/view/Modals/DetailModal/Form';
import { ProjectDocumentVO } from 'project/document/domain';

export interface ProjectDocumentDetailModalProps
  extends ProjectDocumentDetailModalButtonBlockProps,
          ProjectDocumentFormProps {
  open: boolean;
}

export default function ProjectDocumentDetailModal({
                                                     open,
                                                     onClose,
                                                     onEdit,
                                                     onDelete,
                                                     detail,
                                                   }: ProjectDocumentDetailModalProps) {
  return (
    <ModalLayout
      title="자료 상세"
      open={open}
      onClose={onClose}
      children={
        // <FormikProvider>
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <Form detail={detail} />
          <ProjectDocumentDetailModalButtonBlock
            onEdit={onEdit}
            onDelete={onDelete}
            onClose={onClose}
          />
        </Box>
        // </FormikProvider>
      }
    />
  );
};
