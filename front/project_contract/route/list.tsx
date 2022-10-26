import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { projectContractAction } from 'project_contract/action';
import ProjectContractListSection from 'project_contract/view/ContractList';
import { ProjectContractId } from 'project_contract/domain';
import { RootState } from 'services/reducer';

export default function ProjectContractListRoute() {

  const dispatch = useDispatch();
  const { list } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setModal(null)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectContractId) => dispatch(projectContractAction.setModal(id)), [dispatch]);
  const openFinalModal = useCallback(() => dispatch(projectContractAction.setFinalModal(true)), [dispatch]);

  return (
    <ProjectContractListSection
      list={list}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
      openFinalModal={openFinalModal}
    />
  );
}
