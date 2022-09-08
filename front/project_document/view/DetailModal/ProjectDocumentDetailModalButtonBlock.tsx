import React from 'react';
import {
  Box,
} from '@mui/material';
import Button from 'layouts/Button';

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
