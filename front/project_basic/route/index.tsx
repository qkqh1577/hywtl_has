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
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import ProjectBasicBusinessModalRoute from 'project_basic/route/businessModal';
import ProjectBasicContributorRoute from 'project_basic/route/contributor';

function Element() {
  const dispatch = useDispatch();
  const id = useId();

  useEffect(() => {
    dispatch(projectBasicAction.setId(id ? ProjectId(id) : undefined));
  }, [id]);

  return (
    <Box sx={{ width: '100%' }}>
      <ProjectBasicContributorRoute />
      <ProjectBasicBasicRoute />
      <ProjectBasicBusinessRoute />
      <ProjectBasicBusinessModalRoute />
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
