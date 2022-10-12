import ProjectEstimateListSection from 'project_estimate/view/EstimateList';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectEstimateAction } from 'project_estimate/action';
import { ProjectId } from 'project/domain';
import useId from 'services/useId';
import {
  ProjectEstimateId,
  ProjectEstimateType
} from 'project_estimate/domain';


export default function ProjectEstimateListRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { list } = useSelector((root: RootState) => root.projectEstimate);
  const openCustomAddModal = useCallback((type: ProjectEstimateType) => dispatch(projectEstimateAction.setCustomAddModal(type)), [dispatch]);
  const openCustomDetailModal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setCustomDetailModal(id)), [dispatch]);
  const openSystemAddModal = useCallback(() => dispatch(projectEstimateAction.setSystemModal(null)), [dispatch]);
  const openSystemDetailModal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setSystemModal(id)), [dispatch]);

  useEffect(() => {
    dispatch(projectEstimateAction.setProjectId(id ? ProjectId(id) : undefined));
  }, [id]);

  return (
    <ProjectEstimateListSection
      list={list}
      openCustomAddModal={openCustomAddModal}
      openCustomDetailModal={openCustomDetailModal}
      openSystemAddModal={openSystemAddModal}
      openSystemDetailModal={openSystemDetailModal}
    />
  );
}