import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectStatusLeftBar from 'project_status/view/StatusBar/Left';
import ProjectStatusRightBar from 'project_status/view/StatusBar/Right';
import { Box } from '@mui/material';
import { ProjectStatus } from 'project/domain';

export default function ProjectStatusRoute() {

  const { test, contract } = useSelector((root: RootState) => root.projectBasic);
  const { detail } = useSelector((root: RootState) => root.project);

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      padding:        '0 20px 20px 20px',
      justifyContent: 'space-between',
    }}>
      <ProjectStatusLeftBar
        status={{ ...detail }}
        onChange={(status: ProjectStatus) => {

        }}
      />
      <ProjectStatusRightBar
        targetTest={test?.targetTest}
        testAmount={contract?.estimate?.plan?.testAmount}
        reviewAmount={contract?.estimate?.plan?.reviewAmount}
      />
    </Box>
  );
}
