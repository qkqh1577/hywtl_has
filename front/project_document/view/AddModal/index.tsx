import ModalLayout from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import React from 'react';
import Form from 'project_document/view/AddModal/Form';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';

interface Props {
  open: boolean;
  onAdd: DefaultFunction;
  onClose: DefaultFunction;
}

export default function ProjectDocumentAddModal(props: Props) {
  const {
          open,
          onClose,
          onAdd,
        } = props;
  return (
    <ModalLayout
      title="자료 등록"
      width="30vw"
      open={open}
      onClose={onClose}
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
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'center',
        }}>
          <Button
            onClick={onAdd}
            sx={{
              marginRight: '10px',
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
