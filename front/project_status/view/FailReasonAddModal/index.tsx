import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import Form from './Form';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';

interface Props {
  onClose: DefaultFunction;
  open: boolean;
}

export default function ProjectStatusFailReasonAddModal(props: Props) {
  const { onClose, open } = props;
  const formik = useContext(FormikContext);

  return (
    <ModalLayout
      width="30vw"
      open={open}
      title="수주실패 원인 입력"
      onClose={onClose}
      children={<Form />}
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
          <Button shape="basic2" onClick={onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}
