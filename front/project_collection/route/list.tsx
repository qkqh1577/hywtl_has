import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import ProjectCollectionList from 'project_collection/view/List';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectCollectionAction } from 'project_collection/action';
import { ProjectCollectionStageId } from 'project_collection/domain';
import { UserId } from 'user/domain';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectCollectionListRoute() {

  const dispatch = useDispatch();
  const { contract } = useSelector((root: RootState) => root.projectBasic);
  const { projectId, detail, requestUpdateManager } = useSelector((root: RootState) => root.projectCollection);
  const updateManager = useCallback((userId: UserId | undefined) => dispatch(projectCollectionAction.updateManager(userId)), [dispatch]);
  const openAddModal = useCallback(() => dispatch(projectCollectionAction.stageAddModal(true)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectCollectionStageId) => dispatch(projectCollectionAction.stageDetailModal(id)), [dispatch]);
  const totalAmount = useMemo(() => {
    if (!contract || !contract.estimate.plan?.totalAmount) {
      return undefined;
    }
    const isLh = contract.estimate.isLh;

    const value = contract.estimate.plan.totalAmount ?? 0;

    return value * (isLh ? 1.0 : 1.1);
  }, [contract]);

  useEffect(() => {
    closeStatus(requestUpdateManager, () => {
      dispatch(projectCollectionAction.setProjectId(projectId));
    }, () => {
      dispatch(projectCollectionAction.requestUpdateManager('idle'));
    });
  }, [requestUpdateManager]);

  return (
    <ProjectCollectionList
      totalAmount={totalAmount}
      detail={detail}
      onUpdate={updateManager}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
    />
  );
}