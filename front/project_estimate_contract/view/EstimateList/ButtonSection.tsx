import { Box } from '@mui/material';
import Button from 'layouts/Button';
import React from 'react';

export default function () {
  return (
    <Box sx={{
      display:                       'flex',
      width:                         ' 100%',
      flexWrap:                      'nowrap',
      '& > button:not(:last-child)': {
        marginRight: '10px',
      }
    }}>
      <Button shape="basic1">최종 선택</Button>
      <Button shape="basic1">+ 대비 견적서 등록</Button>
      <Button shape="basic1">+ 협력 견적서 등록</Button>
      <Button shape="basic1">+ 커스텀 견적서 등록</Button>
      <Button shape="basic1">+ 시스템 견적서 등록</Button>
    </Box>
  );
}