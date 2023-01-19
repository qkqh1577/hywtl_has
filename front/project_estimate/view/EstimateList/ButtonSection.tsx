import { Box } from '@mui/material';
import Button from 'layouts/Button';
import React from 'react';
import { ProjectEstimateType } from 'project_estimate/domain';
import { DefaultFunction } from 'type/Function';

export interface ProjectEstimateListButtonProps {
  openCustomAddModal: (type: ProjectEstimateType) => void;
  openSystemAddModal: DefaultFunction;
  openFinalModal: DefaultFunction;
}

export default function (props: ProjectEstimateListButtonProps) {
  return (
    <Box sx={{
      display:                       'flex',
      width:                         ' 100%',
      flexWrap:                      'nowrap',
      '& > button:not(:last-child)': {
        marginRight: '10px',
      }
    }}>
      <Button shape="small" sx={{ width: 'auto' }} onClick={props.openFinalModal}>확정 여부 선택</Button>
      <Button shape="small" onClick={() => {
        props.openCustomAddModal(ProjectEstimateType.COMPARISON);
      }}>
        + 대비 견적서 등록
      </Button>
      <Button shape="small" onClick={() => {
        props.openCustomAddModal(ProjectEstimateType.SUB_CONTRACTOR);
      }}>
        + 협력 견적서 등록
      </Button>
      <Button shape="small" onClick={() => {
        props.openCustomAddModal(ProjectEstimateType.CUSTOM);
      }}>
        + 커스텀 견적서 등록
      </Button>
      <Button shape="small" onClick={() => {
        props.openSystemAddModal();
      }}>
        + 시스템 견적서 등록
      </Button>
    </Box>
  );
}
