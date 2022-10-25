import React, {
  useCallback,
  useEffect,
} from 'react';
import ProjectCollectionList from 'project_collection/view/List';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectCollectionAction } from 'project_collection/action';
import { ProjectId } from 'project/domain';
import { ProjectCollectionStageId } from 'project_collection/domain';
import useId from 'services/useId';
import { UserId } from 'user/domain';

export default function ProjectCollectionListRoute() {

  const id = useId();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.projectCollection);
  const updateManager = useCallback((userId: UserId | undefined) => projectCollectionAction.updateManager(userId), [dispatch]);
  const openAddModal = useCallback(() => dispatch(projectCollectionAction.stageAddModal(true)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectCollectionStageId) => dispatch(projectCollectionAction.stageDetailModal(id)), [dispatch]);

  useEffect(() => {
    dispatch(projectCollectionAction.setProjectId(id ? ProjectId(id) : undefined));
  }, [id]);

  return (
    <ProjectCollectionList
      detail={detail}
      onUpdate={updateManager}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
    />
  );
}