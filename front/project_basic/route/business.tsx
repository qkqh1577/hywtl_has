import React from 'react';
import {
  useSelector
} from 'react-redux';
import ProjectBasicBusinessSection from 'project_basic/view/BusinessSection';
import { RootState } from 'services/reducer';

export default function ProjectBasicBusinessRoute() {
  const { businessList } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicBusinessSection projectBasicBusinessList={businessList || []} />
  );
}
