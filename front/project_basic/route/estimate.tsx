import React from 'react';
import ProjectBasicEstimateSection from 'project_basic/view/EstimateSection';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import { ProjectBasicBidType } from 'project/domain';

export default function ProjectBasicEstimateRoute() {
  const { detail } = useSelector((root: RootState) => root.project);
  const { estimate, rivalEstimateList } = useSelector((root: RootState) => root.projectBasic);
  if (detail?.bidType === ProjectBasicBidType.DEFAULT) {
    return (
      <ProjectBasicEstimateSection
        detail={estimate}
        rivalList={rivalEstimateList}
      />
    );
  }

  return null;
}
