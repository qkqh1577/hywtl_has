import ProjectDocumentModalButtonBlock from 'project_document/view/AddModal/ButtonBlock';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import React from 'react';
import Form from 'project_document/view/AddModal/Form';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikPartial } from 'type/Form';
import { ProjectDocumentParameter } from 'project_document/parameter';

interface Props
  extends FormikLayoutProps<FormikPartial<ProjectDocumentParameter>> {
  open: boolean;
  onClose: ModalLayoutProps['onClose'];
}

export default function ProjectDocumentAddModal(props: Props) {
  const {
          open,
          onClose,
          formik
        } = props;
  const onSubmit = () => {formik.handleSubmit();};
  return (
    <ModalLayout
      title="자료 등록"
      width="40vw"
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <FormikProvider value={formik}>
            <Form />
          </FormikProvider>
        </Box>
      }
      footer={
        <ProjectDocumentModalButtonBlock
          onSubmit={onSubmit}
          onClose={onClose}
        />
      }
    />
  );
}
