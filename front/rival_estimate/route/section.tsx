import {
  useDispatch,
  useSelector
} from 'react-redux';
import RivalEstimateListSection from 'rival_estimate/view/Section';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { rivalEstimateAction } from 'rival_estimate/action';
import { ProjectId } from 'project/domain';
import { RivalEstimateParameter } from 'rival_estimate/parameter';
import { RivalEstimateId } from 'rival_estimate/domain';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function RivalEstimateListRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { projectId, list, requestPush, requestUpdate, requestDelete } = useSelector((root: RootState) => root.rivalEstimate);
  const push = useCallback(() => dispatch(rivalEstimateAction.push()), [dispatch]);
  const onUpdate = useCallback((params: RivalEstimateParameter) => dispatch(rivalEstimateAction.update(params)), [dispatch]);
  const onDelete = useCallback((id: RivalEstimateId) => dispatch(rivalEstimateAction.deleteOne(id)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(rivalEstimateAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    if (requestPush === ApiStatus.DONE) {
      dispatch(rivalEstimateAction.requestPush(ApiStatus.IDLE));
      reload(projectId);
    }
    else if (requestPush === ApiStatus.FAIL) {
      error('등록에 실패하였습니다.');
      dispatch(rivalEstimateAction.requestPush(ApiStatus.IDLE));
    }
  }, [requestPush]);

  useEffect(() => {
    if (requestUpdate === ApiStatus.DONE) {
      dispatch(rivalEstimateAction.requestUpdate(ApiStatus.IDLE));
      reload(projectId);
    }
    else if (requestUpdate === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(rivalEstimateAction.requestUpdate(ApiStatus.IDLE));
    }
  }, [requestUpdate]);

  useEffect(() => {
    if (requestDelete === ApiStatus.DONE) {
      dispatch(rivalEstimateAction.requestDelete(ApiStatus.IDLE));
      reload(projectId);
    }
    else if (requestDelete === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(rivalEstimateAction.requestDelete(ApiStatus.IDLE));
    }
  }, [requestDelete]);

  return (
    <RivalEstimateListSection
      list={list}
      onAdd={push}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}