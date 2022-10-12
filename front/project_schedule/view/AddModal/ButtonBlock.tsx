import React from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

export default function (props: Props) {
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button
        onClick={props.onSubmit}
        sx={{
          marginRight: '10px',
        }}>
        저장
      </Button>
      <Button shape="basic2" onClick={props.onClose}>
        취소
      </Button>
    </Box>
  );
};
