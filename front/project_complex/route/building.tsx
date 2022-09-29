import React, { useCallback, } from 'react';
import ProjectComplexBuildingSection from 'project_complex/view/Building';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectComplexAction } from 'project_complex/action';
import useDialog from 'components/Dialog';
import { ProjectComplexBuildingParameter, } from 'project_complex/parameter';
import { ProjectComplexBuildingId, } from 'project_complex/domain';

export default function ProjectComplexBuildingRoute() {

  const dispatch = useDispatch();
  const { id, buildingList } = useSelector((root: RootState) => root.projectComplex);
  const { error } = useDialog();

  const add = useCallback(() => {
    if (!id) {
      error('프로젝트가 선택되지 않았습니다.');
      return;
    }
    dispatch(projectComplexAction.pushBuilding());
  }, [dispatch, id]);

  const update = useCallback((params: ProjectComplexBuildingParameter) => dispatch(projectComplexAction.updateBuilding(params)), [dispatch]);
  const deleteBuilding = useCallback((id: ProjectComplexBuildingId) => dispatch(projectComplexAction.deleteBuilding(id)), [dispatch]);

  return (
    <ProjectComplexBuildingSection
      list={buildingList}
      onAdd={add}
      onUpdate={update}
      onDelete={deleteBuilding}
    />
  );
}