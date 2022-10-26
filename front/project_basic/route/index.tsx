import { AppRoute } from 'services/routes';
import React from 'react';
import ProjectContainerRoute from 'project/route/container';
import ProjectBasicBasicRoute from 'project_basic/route/basic';
import ProjectBasicEstimateRoute from 'project_basic/route/estimate';
import ProjectBasicBusinessRoute from 'project_basic/route/business';
import ProjectBasicTestRoute from 'project_basic/route/test';
import ProjectBasicDesignRoute from 'project_basic/route/design';
import ProjectBasicBidRoute from 'project_basic/route/bid';
import ProjectBasicContractRoute from 'project_basic/route/contract';
import ProjectBasicFailReasonRoute from 'project_basic/route/failReason';
import { Box } from '@mui/material';
import ProjectBasicBusinessModalRoute from 'project_basic/route/businessModal';
import ProjectBasicContributorRoute from 'project_basic/route/contributor';

function Element() {

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
