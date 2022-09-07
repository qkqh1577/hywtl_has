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
import { ProjectEstimateType } from 'project_estimate/domain';


export default function ProjectEstimateListRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { list } = useSelector((root: RootState) => root.projectEstimate);
  const openAddModal = useCallback((type: ProjectEstimateType) => dispatch(projectEstimateAction.setCustomAddModal(type)), [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(projectEstimateAction.setProjectId(ProjectId(id)));
    }
  }, [id]);

  return (
    <ProjectEstimateListSection
      list={list}
      openAddModal={openAddModal}
    />
  );
}