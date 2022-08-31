import {
  Box,
  Button
} from '@mui/material';
import React from 'react';

export interface ProjectDocumentModalButtonBlockProps {
  onSubmit: () => void;
  onClose: () => void;
}

export default function ProjectDocumentModalButtonBlock({
                                                             onSubmit,
                                                             onClose,
                                                           }: ProjectDocumentModalButtonBlockProps) {
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button onClick={onSubmit}>저장</Button>
      <Button onClick={onClose}>취소</Button>
    </Box>
  );
};
