import { AppRoute } from 'services/routes';
import React, { useEffect } from 'react';
import ProjectContainerRoute from 'project/route/container';
import ProjectBasicBasicRoute from 'project_basic/route/basic';
import ProjectBasicEstimateRoute from 'project_basic/route/estimate';
import ProjectBasicBusinessRoute from 'project_basic/route/business';
import ProjectBasicTestRoute from 'project_basic/route/test';
import ProjectBasicDesignRoute from 'project_basic/route/design';
import ProjectBasicBidRoute from 'project_basic/route/bid';
import ProjectBasicContractRoute from 'project_basic/route/contract';
import ProjectBasicFailReasonRoute from 'project_basic/route/failReason';
import { projectBasicAction } from 'project_basic/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { Box } from '@mui/material';
import ProjectBasicBusinessAddModalRoute from 'project_basic/route/businessAddModal';
import ProjectBasicBusinessDetailModalRoute from 'project_basic/route/businessDetailModal';
import ProjectBasicBusinessUpdateModalRoute from 'project_basic/route/businessUpdateModal';

function Element() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { id } = useSelector((root: RootState) => root.projectBasic);

  useEffect(() => {
    if (detail && detail.id !== id) {
      dispatch(projectBasicAction.setId(detail.id));
    }
  }, [detail]);

  return (
    <Box sx={{ width: '100%' }}>
      <ProjectBasicBasicRoute />
      <ProjectBasicBusinessRoute />
      <ProjectBasicBusinessAddModalRoute />
      <ProjectBasicBusinessDetailModalRoute />
      <ProjectBasicBusinessUpdateModalRoute />
      <ProjectBasicDesignRoute />
      <ProjectBasicTestRoute />
      <ProjectBasicEstimateRoute />
      <ProjectBasicBidRoute />
      <ProjectBasicContractRoute />
      <ProjectBasicFailReasonRoute />
    </Box>
  );
}

const projectBasicRoute: AppRoute = {
  path:    '/project/sales-management/:id/basic',
  element: (
             <ProjectContainerRoute>
               <Element />
             </ProjectContainerRoute>
           )
};

export default projectBasicRoute;
