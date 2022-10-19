import ProjectBasicContractSection from 'project_basic/view/ContractSection';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicContractRoute() {
  const { contract } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicContractSection
      detail={contract}
    />
  );
}
