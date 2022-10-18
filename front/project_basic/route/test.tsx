import ProjectBasicTestSection from 'project_basic/view/TestSection';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicTestRoute() {
  const { test } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicTestSection detail={test} />
  );
}
