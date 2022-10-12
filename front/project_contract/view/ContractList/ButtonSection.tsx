import { Box } from '@mui/material';
import Button from 'layouts/Button';
import React from 'react';
import { DefaultFunction } from 'type/Function';

export interface ProjectContractListButtonProps {
  openFinalModal: DefaultFunction;
  openAddModal: DefaultFunction;
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
      <Button shape="small" onClick={props.openFinalModal}>최종 선택</Button>
      <Button shape="small" onClick={props.openAddModal}>
        + 등록
      </Button>
    </Box>
  );
}