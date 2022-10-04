import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';

interface Props {
  onDelete: DefaultFunction;
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function ButtonBlock({
                                      onDelete,
                                      onClose,
                                      onCancel,
                                    }: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const onEdit = () => {
    formik.setFieldValue('edit', true);
  };
  const onSubmit = () => {
    formik.handleSubmit();
  };

  if (edit) {
    return (
      <Box sx={{
        display:        'flex',
        height:         '30px',
        width:          '100%',
        justifyContent: 'center',
      }}>
        <Button
          onClick={onSubmit}
          sx={{ marginRight: '10px' }}>
          저장
        </Button>
        <Button shape="basic2" onClick={onCancel}>취소</Button>
      </Box>
    );
  }
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button
        shape="basic2"
        onClick={onDelete}
        sx={{
          marginRight: '10px',
        }}>
        삭제
      </Button>
      <Button
        onClick={onEdit}
        sx={{
          marginRight: '10px',
        }}>
        수정
      </Button>
      <Button shape="basic3" onClick={onClose}>
        닫기
      </Button>
    </Box>
  );
};
