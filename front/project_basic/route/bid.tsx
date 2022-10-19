import React from 'react';
import ProjectBasicBidSection from 'project_basic/view/BidSection';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicBidRoute() {
  const { bid, rivalBidList } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicBidSection
      detail={bid}
      rivalList={rivalBidList}
    />
  );
}
