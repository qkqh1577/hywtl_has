import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { projectContractAction } from 'project_contract/action';
import { ProjectId } from 'project/domain';
import useId from 'services/useId';
import ProjectContractListSection from 'project_contract/view/ContractList';
import { ProjectContractId, } from 'project_contract/domain';
import { RootState } from 'services/reducer';
import { initialProjectContractParameter } from 'project_contract/parameter';

export default function ProjectContractListRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { list } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setModal(initialProjectContractParameter)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectContractId) => dispatch(projectContractAction.setId(id)), [dispatch]);
  const openFinalModal = useCallback(() => dispatch(projectContractAction.setFinalModal(true)), [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(projectContractAction.setProjectId(ProjectId(id)));
    }
  }, [id]);

  return (
    <ProjectContractListSection
      list={list}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
      openFinalModal={openFinalModal}
    />
  );
}
