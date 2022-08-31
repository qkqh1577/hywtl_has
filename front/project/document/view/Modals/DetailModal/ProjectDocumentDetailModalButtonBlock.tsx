import React from 'react';
import {
  Box,
  Button
} from '@mui/material';

export interface ProjectDocumentDetailModalButtonBlockProps {
  onDelete: () => void;
  onEdit: () => void;
  onClose: () => void;
}

export default function ProjectDocumentDetailModalButtonBlock({
                                                                onDelete,
                                                                onEdit,
                                                                onClose,
                                                              }: ProjectDocumentDetailModalButtonBlockProps) {
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button onClick={onDelete}>삭제</Button>
      <Button onClick={onEdit}>수정</Button>
      <Button onClick={onClose}>닫기</Button>
    </Box>
  );
};
