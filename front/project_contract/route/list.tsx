import React, {
  useCallback,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import { projectContractAction } from 'project_contract/action';
import { ProjectId } from 'project/domain';
import useId from 'services/useId';
import ProjectContractListSection from 'project_contract/view/ContractList';
import { ProjectContractShort } from 'project_contract/domain';
/*import {
  ProjectEstimateId,
  ProjectEstimateType
} from 'project_estimate/domain';*/


export default function ProjectContractListRoute() {

  const dispatch = useDispatch();
  const id = useId();
  //const { list } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setAddModal(true)), [dispatch]);
  //const openDetailModal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setCustomDetailModal(id)), [dispatch]);
  const getVariableList = useCallback(() => dispatch(projectContractAction.getVariableList()), [dispatch]);
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
    return {
      id:           i,
      confirmed:    i === 7,
      code:         'code' + i,
      estimateCode: 'estimateCode' + i,
      createdBy:    { name: 'name' + i },
      modifiedAt:   new Date(),
      createdAt:    new Date(),
      note:         'note' + i,
    } as ProjectContractShort;
  });

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
      openDetailModal={() => {}}
      openConfirmModal={() => {}}
    />
  );
}
