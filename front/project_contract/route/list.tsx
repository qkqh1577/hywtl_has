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

export default function ProjectContractListRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { list } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setAddModal(true)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectContractId) => {
    console.log('openDetailModal',id);
    dispatch(projectContractAction.setDetailModal(id));
  }, [dispatch]);
  const getVariableList = useCallback(() => dispatch(projectContractAction.getVariableList()), [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(projectContractAction.setProjectId(ProjectId(id)));
    }
  }, [id]);

  return (
    <ProjectContractListSection
      list={list}
      openAddModal={openAddModal}
      getVariableList={getVariableList}
      openDetailModal={openDetailModal}
      openConfirmModal={() => {}}
    />
  );
}
