import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
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
  //const openAddModal = useCallback((type: ProjectEstimateType) => dispatch(projectEstimateAction.setCustomAddModal(type)), [dispatch]);
  //const openDetailModal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setCustomDetailModal(id)), [dispatch]);

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
    return {
      id:           i,
      confirmed:    i % 2 === 0,
      code:         'code' + i,
      estimateCode: 'estimateCode' + i,
      createdBy:    {name:'name' + i},
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
      openAddModal={() => {}}
      openDetailModal={() => {}}
      openConfirmModal={() => {}}
    />
  );
}