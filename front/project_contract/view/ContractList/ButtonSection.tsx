import { Box } from '@mui/material';
import Button from 'layouts/Button';
import React from 'react';

export interface ProjectContractListButtonProps {
  openConfirmModal: () => void;
  openAddModal: () => void;
}

export default function (props: ProjectContractListButtonProps) {
  return (
    <Box sx={{
      display:                       'flex',
      width:                         ' 100%',
      flexWrap:                      'nowrap',
      '& > button:not(:last-child)': {
        marginRight: '10px',
      }
    }}>
      <Button onClick={() => props.openConfirmModal()}>최종 선택</Button>
      <Button onClick={() => props.openAddModal()}>
        + 등록
      </Button>
    </Box>
  );
}