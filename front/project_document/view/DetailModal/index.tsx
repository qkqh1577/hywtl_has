import { Box } from '@mui/material';
import ModalLayout from 'layouts/ModalLayout';
import React, { useContext } from 'react';
import ProjectDocumentDetailModalButtonBlock from 'project_document/view/DetailModal/ProjectDocumentDetailModalButtonBlock';
import Form from 'project_document/view/DetailModal/Form';
import ProjectDocumentUpdateModalButtonBlock from 'project_document/view/DetailModal/ButtonBlock';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onChange: DefaultFunction;
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function ProjectDocumentDetailModal(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  return (
    <ModalLayout
      width="35vw"
      title={edit ? '자료 수정' : '자료 상세'}
      open={props.open}
      onClose={props.onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <Form />
        </Box>
      }
      footer={
        <>
          {!edit && (
            <ProjectDocumentDetailModalButtonBlock
              onEdit={() => {
                formik.setFieldValue('edit', true);
              }}
              onDelete={props.onDelete}
              onClose={props.onClose}
            />
          )}
          {edit && (
            <ProjectDocumentUpdateModalButtonBlock
              onChange={props.onChange}
              onCancel={props.onCancel}
            />
          )}
        </>
      }
    />
  );
};
