import React from 'react';
import ProjectBasicBidSection from 'project_basic/view/BidSection';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import { ProjectBasicBidType } from 'project/domain';

export default function ProjectBasicBidRoute() {
  const { detail } = useSelector((root: RootState) => root.project);
  const { bid, rivalBidList } = useSelector((root: RootState) => root.projectBasic);

  if (detail?.bidType === ProjectBasicBidType.COMPANY || detail?.bidType === ProjectBasicBidType.G2B) {

    return (
      <ProjectBasicBidSection
        detail={bid}
        rivalList={rivalBidList}
      />
    );
  }

  return null;
}
