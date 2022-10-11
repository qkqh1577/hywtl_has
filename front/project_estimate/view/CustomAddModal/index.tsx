import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { projectEstimateTypeName } from 'project_estimate/domain';
import { DefaultFunction } from 'type/Function';
import Form from './Form';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';
import { Box } from '@mui/material';

interface Props {
  onClose: DefaultFunction;
}

export default function ProjectCustomEstimateAddModal(props: Props) {
  const { onClose } = props;
  const formik = useContext(FormikContext);
  const open = !!formik.values.type;

  return (
    <ModalLayout
      width="30vw"
      open={!!formik.values.type}
      title={`${open ? projectEstimateTypeName(formik.values.type) : ''} 견적서 등록`}
      onClose={onClose}
      children={
        <Form />
      }
      footer={
        <Box sx={{
          width:          '100%',
          margin:         '20px 0',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
        }}>
          <Button
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              formik.handleSubmit();
            }}>
            저장
          </Button>
          <Button shape="basic3" onClick={onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}