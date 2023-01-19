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
  const { projectId, detail, requestUpdateManager, requestChangeStageSeq } = useSelector((root: RootState) => root.projectCollection);
  const updateManager = useCallback((userId: UserId | undefined) => dispatch(projectCollectionAction.updateManager(userId)), [dispatch]);
  const openAddModal = useCallback(() => dispatch(projectCollectionAction.stageAddModal(true)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectCollectionStageId) => dispatch(projectCollectionAction.stageDetailModal(id)), [dispatch]);
  const changeSeq = useCallback((idList: ProjectCollectionStageId[]) => dispatch(projectCollectionAction.changeStageSeq(idList)), [dispatch]);
  const totalAmount = useMemo(() => {
    if (!contract || !contract.id || !contract.totalAmount) {
      return undefined;
    }
    const value = contract.totalAmount ?? 0;
    return Number((value).toFixed(0));
  }, [contract]);

  useEffect(() => {
    closeStatus(requestUpdateManager, () => {
      dispatch(projectCollectionAction.setProjectId(projectId));
    }, () => {
      dispatch(projectCollectionAction.requestUpdateManager('idle'));
    });
  }, [requestUpdateManager]);

  useEffect(() => {
    closeStatus(requestChangeStageSeq, () => {
      dispatch(projectCollectionAction.setProjectId(projectId));
    }, () => {
      dispatch(projectCollectionAction.requestChangeStageSeq('idle'));
    })
  }, [requestChangeStageSeq])

  return (
    <ProjectCollectionList
      totalAmount={totalAmount}
      detail={detail}
      onUpdate={updateManager}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
      changeSeq={changeSeq}
    />
  );
}
