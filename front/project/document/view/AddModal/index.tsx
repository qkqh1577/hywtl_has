import ProjectDocumentModalButtonBlock, {
  ProjectDocumentModalButtonBlockProps
} from 'project/document/view/AddModal/ButtonBlock';
import ModalLayout from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import React from 'react';
import Form from 'project/document/view/AddModal/Form';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikPartial } from 'type/Form';
import { ProjectDocumentParameter } from 'project/document/parameter';

export interface ProjectDocumentModalProps
  extends ProjectDocumentModalButtonBlockProps,
    FormikLayoutProps<FormikPartial<ProjectDocumentParameter>> {
  open: boolean;
}

export default function ProjectDocumentModal({
  open,
  onSubmit,
  onClose,
  formik
}: ProjectDocumentModalProps) {
  return (
    <ModalLayout
      title="자료 등록"
      open={open}
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
          }}>
            <Form />
            <ProjectDocumentModalButtonBlock
              onSubmit={onSubmit}
              onClose={onClose}
            />
          </Box>
        </FormikProvider>
      }
    />
  );
}
