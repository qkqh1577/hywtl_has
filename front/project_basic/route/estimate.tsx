import React from 'react';
import ProjectBasicEstimateSection from 'project_basic/view/EstimateSection';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicEstimateRoute() {
  const { detail } = useSelector((root: RootState) => root.project);
  const { estimate, rivalEstimateList } = useSelector((root: RootState) => root.projectBasic);
    return (
      <ProjectBasicEstimateSection
        project={detail}
        detail={estimate}
        rivalList={rivalEstimateList}
      />
    );
}
