import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

interface Props {
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
  onClose: DefaultFunction;
}

export default function (props: Props) {


  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  if (!edit) {
    return (
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        margin:         '10px 0',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          width:   '45%',
          display: 'flex',
        }}>
          <Button shape="basic3" onClick={props.onDelete}>삭제</Button>
        </Box>
        <Box sx={{
          width:          '45%',
          display:        'flex',
          justifyContent: 'flex-end',
        }}>
          <Button sx={{ marginRight: '10px' }} onClick={() => {
            formik.setFieldValue('edit', true);
          }}>
            수정
          </Button>
          <Button shape="basic2" onClick={props.onClose}>닫기</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      margin:         '10px 0',
      justifyContent: 'center',
      '& > button':   {
        margin: '0 5px',
      }
    }}>
      <Button onClick={() => {
        formik.handleSubmit();
      }}>
        저장
      </Button>
      <Button shape="basic2" onClick={props.onCancel}>
        취소
      </Button>
    </Box>
  );
}