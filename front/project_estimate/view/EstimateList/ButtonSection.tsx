import { Box } from '@mui/material';
import Button from 'layouts/Button';
import React from 'react';
import { ProjectEstimateType } from 'project_estimate/domain';

export interface ProjectEstimateListButtonProps {
  openAddModal: (type: ProjectEstimateType) => void;
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
      <Button shape="small">최종 선택</Button>
      <Button shape="small" onClick={() => {
        props.openAddModal(ProjectEstimateType.COMPARISON);
      }}>
        + 대비 견적서 등록
      </Button>
      <Button shape="small" onClick={() => {
        props.openAddModal(ProjectEstimateType.SUB_CONTRACTOR);
      }}>
        + 협력 견적서 등록
      </Button>
      <Button shape="small" onClick={() => {
        props.openAddModal(ProjectEstimateType.CUSTOM);
      }}>
        + 커스텀 견적서 등록
      </Button>
      <Button shape="small" onClick={() => {
        props.openAddModal(ProjectEstimateType.SYSTEM);
      }}>
        + 시스템 견적서 등록
      </Button>
    </Box>
  );
}