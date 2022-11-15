import React from 'react';
import { Box, } from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import { ProjectDocumentId } from 'project_document/domain';

interface Props {
  onDelete: (id: ProjectDocumentId) => void;
  onEdit: DefaultFunction;
  onClose: DefaultFunction;
  projectDocumentId: ProjectDocumentId;
}

export default function ProjectDocumentDetailModalButtonBlock({
                                                                onDelete,
                                                                onEdit,
                                                                onClose,
                                                                projectDocumentId
                                                              }: Props) {
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button
        shape="basic3"
        onClick={() => {
          onDelete(projectDocumentId);
        }}
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
      <Button shape="basic2" onClick={onClose}>
        닫기
      </Button>
    </Box>
  );
};
