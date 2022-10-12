import ProjectContainerRoute from 'project/route/container';
import { AppRoute } from 'services/routes';
import React from 'react';
import { Box } from '@mui/material';
import ProjectCustomEstimateAddModalRoute from 'project_estimate/route/customAddModal';
import ProjectEstimateListRoute from 'project_estimate/route/list';
import ProjectContractListRoute from 'project_contract/route/list';
import RivalEstimateListRoute from 'rival_estimate/route/section';
import ProjectBidRoute from 'project_bid/route';
import ProjectCustomEstimateDetailModalRoute from 'project_estimate/route/customDetailModal';
import ProjectContractAddModalRoute from 'project_contract/route/addModal';
import ProjectContractDetailModalRoute from 'project_contract/route/detailModal';
import ProjectSystemEstimateModalRoute from 'project_estimate/route/systemModal';
import ProjectEstimateFinalModalRoute from 'project_estimate/route/finalModal';
import ProjectContractFinalModalRoute from 'project_contract/route/finalModal';

function Element() {

  return (
    <ProjectContainerRoute>
      <Box sx={{ width: '100%' }}>
        <ProjectEstimateListRoute />
        <RivalEstimateListRoute />
        <ProjectBidRoute />
        <ProjectContractListRoute />
        <ProjectCustomEstimateAddModalRoute />
        <ProjectCustomEstimateDetailModalRoute />
        <ProjectContractAddModalRoute />
        <ProjectContractDetailModalRoute />
        <ProjectSystemEstimateModalRoute />
        <ProjectEstimateFinalModalRoute />
        <ProjectContractFinalModalRoute />
      </Box>
    </ProjectContainerRoute>
  );
}

const projectEstimateContractRoute: AppRoute = {
  path:    '/project/sales-management/:id/estimate_contract',
  element: <Element />
};

export default projectEstimateContractRoute;