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
import useDialog from 'dialog/hook';

export default function RivalEstimateListRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { projectId, list, requestPush, requestUpdate, requestDelete } = useSelector((root: RootState) => root.rivalEstimate);
  const push = useCallback(() => dispatch(rivalEstimateAction.push()), [dispatch]);
  const onUpdate = useCallback((params: RivalEstimateParameter) => dispatch(rivalEstimateAction.update(params)), [dispatch]);
  const onDelete = useCallback((id: RivalEstimateId) => dispatch(rivalEstimateAction.deleteOne(id)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(rivalEstimateAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    if (requestPush === 'done') {
      dispatch(rivalEstimateAction.requestPush('idle'));
      reload(projectId);
    }
    else if (requestPush === message) {
      error('등록에 실패하였습니다.');
      dispatch(rivalEstimateAction.requestPush('idle'));
    }
  }, [requestPush]);

  useEffect(() => {
    if (requestUpdate === 'done') {
      dispatch(rivalEstimateAction.requestUpdate('idle'));
      reload(projectId);
    }
    else if (requestUpdate === message) {
      error('변경에 실패하였습니다.');
      dispatch(rivalEstimateAction.requestUpdate('idle'));
    }
  }, [requestUpdate]);

  useEffect(() => {
    if (requestDelete === 'done') {
      dispatch(rivalEstimateAction.requestDelete('idle'));
      reload(projectId);
    }
    else if (requestDelete === message) {
      error('삭제에 실패하였습니다.');
      dispatch(rivalEstimateAction.requestDelete('idle'));
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