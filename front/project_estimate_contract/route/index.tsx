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

function Element() {

  return (
    <ProjectContainerRoute>
      <ProjectEstimateListRoute />
      <RivalEstimateListRoute />
      <ProjectBidRoute />
      <ProjectContractListRoute />
      <ProjectCustomEstimateAddModalRoute />
      <ProjectCustomEstimateDetailModalRoute />
      <ProjectContractAddModalRoute />
    </ProjectContainerRoute>
  );
}

const projectEstimateContractRoute: AppRoute = {
  path:    '/project/sales-management/:id/estimate_contract',
  element: <Element />
};

export default projectEstimateContractRoute;