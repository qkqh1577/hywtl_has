import React from 'react';
import ProjectBasicEstimateSection from 'project_basic/view/EstimateSection';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicEstimateRoute() {
  const { estimate, rivalEstimateList } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicEstimateSection
      detail={estimate}
      rivalList={rivalEstimateList}
    />
  );
}
