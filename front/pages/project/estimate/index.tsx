import React from 'react';
import ProjectEstimateDetail from './Estimate';
import ProjectEstimateSheetList from 'pages/project/estimate/SheetList';
import ProjectEstimateSheetModal from 'pages/project/estimate/SheetModal';

const ProjectEstimateContainer = () => (
  <>
    <ProjectEstimateDetail />
    <ProjectEstimateSheetList />
    <ProjectEstimateSheetModal />
  </>
);

export default ProjectEstimateContainer;
