import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import { ProjectDocumentId } from 'project/document/domain';

interface Props {
  onDelete: () => void;
  onEdit: () => void;
  onClose: () => void;
}

export default function ProjectDocumentDetailModalButtonBlock({
                                                                onDelete,
                                                                onEdit,
                                                                onClose,
                                                              }: Props) {
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
