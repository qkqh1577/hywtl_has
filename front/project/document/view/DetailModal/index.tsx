import { Box } from '@mui/material';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import React from 'react';
import ProjectDocumentDetailModalButtonBlock from 'project/document/view/DetailModal/ProjectDocumentDetailModalButtonBlock';
import Form from 'project/document/view/DetailModal/Form';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikProvider } from 'formik';
import { DetailModalFormik } from 'project/document/route/detailModal';
import ProjectDocumentUpdateModalButtonBlock from 'project/document/view/DetailModal/ButtonBlock';

interface Props
  extends FormikLayoutProps<DetailModalFormik>,
          Pick<ModalLayoutProps, | 'open' | 'onClose'> {
  onDelete: () => void;
}

export default function ProjectDocumentDetailModal(props: Props) {
  const {
          open,
          onClose,
          onDelete,
          formik
        } = props;
  const edit = formik.values.edit;
  const onEdit = () => {
    formik.setFieldValue('edit', true);
  };
  const onSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <ModalLayout
      width="40vw"
      title={edit ? '자료 수정' : '자료 상세'}
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <FormikProvider value={formik}>
            <Form edit={edit} />
          </FormikProvider>
        </Box>
      }
      footer={
        <>
          {!edit && (
            <ProjectDocumentDetailModalButtonBlock
              onEdit={onEdit}
              onDelete={onDelete}
              onClose={onClose}
            />
          )}
          {edit && (
            <ProjectDocumentUpdateModalButtonBlock
              onSubmit={onSubmit}
              onClose={onClose}
            />
          )}
        </>
      }
    />
  );
};
