import { Box, } from '@mui/material';
import React from 'react';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

interface Props {
  onChange: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function ProjectDocumentUpdateModalButtonBlock(props: Props) {
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button
        onClick={props.onChange}
        sx={{
          marginRight: '10px',
        }}>
        저장
      </Button>
      <Button shape="basic2" onClick={props.onCancel}>
        취소
      </Button>
    </Box>
  );
};
