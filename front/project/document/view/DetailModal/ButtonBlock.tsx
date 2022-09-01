import {
  Box,
  Button
} from '@mui/material';
import React from 'react';

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

export default function ProjectDocumentUpdateModalButtonBlock(props: Props) {
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button onClick={props.onSubmit}>저장</Button>
      <Button onClick={props.onClose}>취소</Button>
    </Box>
  );
};
