import ProjectContainerRoute from 'project/route/container';
import { AppRoute } from 'services/routes';
import React from 'react';
import ProjectCustomEstimateAddModalRoute from 'project_estimate/route/customAddModal';
import ProjectEstimateListRoute from 'project_estimate/route/list';
import ProjectContractListRoute from 'project_contract/route/list';
import RivalEstimateListRoute from 'rival_estimate/route/section';
import ProjectBidRoute from 'project_bid/route';
import ProjectCustomEstimateDetailModalRoute from 'project_estimate/route/customDetailModal';
import ProjectContractAddModalRoute from 'project_contract/route/addModal';
import ProjectContractDetailModalRoute from 'project_contract/route/detailModal';
import { Box } from '@mui/material';

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
      </Box>
    </ProjectContainerRoute>
  );
}

const projectEstimateContractRoute: AppRoute = {
  path:    '/project/sales-management/:id/estimate_contract',
  element: <Element />
};

export default projectEstimateContractRoute;