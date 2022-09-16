import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';

export default function () {

  const formik = useContext(FormikContext);


  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'center',
      '& > button':   {
        margin: '0 5px'
      }
    }}>
      <Button shape="basic2">삭제</Button>
      <Button shape="basic1">수정</Button>
      <Button shape="basic3">닫기</Button>
      <Button shape="basic2">실험정보 입력</Button>
      <Button shape="basic1">계약서 등록</Button>
    </Box>
  );
}