import ModalLayout from 'layouts/ModalLayout';
import React, { useContext } from 'react';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';
import { Box } from '@mui/material';
import Form from './Form';
import { FormikContext } from 'formik';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
}

export default function ProjectCustomEstimateExtensionModal(props: Props) {

  const formik = useContext(FormikContext);
  return (
    <ModalLayout
      width="55vw"
      title=""
      open={props.open}
      onClose={props.onClose}
      children={<Form />}
      footer={
        <Box sx={{
          width:          '100%',
          display:        'flex',
          justifyContent: 'center',
          flexWrap:       'nowrap',
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
          <Button shape="basic2" onClick={props.onClose}>취소</Button>
        </Box>
      }
    />
  );
}