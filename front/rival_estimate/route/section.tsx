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
import { closeStatus } from 'components/DataFieldProps';

export default function RivalEstimateListRoute() {

  const dispatch = useDispatch();
  const { projectId, list, requestPush, requestUpdate, requestDelete } = useSelector((root: RootState) => root.rivalEstimate);
  const push = useCallback(() => dispatch(rivalEstimateAction.push()), [dispatch]);
  const onUpdate = useCallback((params: RivalEstimateParameter) => dispatch(rivalEstimateAction.update(params)), [dispatch]);
  const onDelete = useCallback((id: RivalEstimateId) => dispatch(rivalEstimateAction.deleteOne(id)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(rivalEstimateAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    closeStatus(requestPush, () => {
      reload(projectId);
    }, () => {
      dispatch(rivalEstimateAction.requestPush('idle'));
    });
  }, [requestPush]);

  useEffect(() => {
    closeStatus(requestUpdate, () => {
      reload(projectId);
    }, () => {
      dispatch(rivalEstimateAction.requestUpdate('idle'));
    });
  }, [requestUpdate]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      reload(projectId);
    }, () => {
      dispatch(rivalEstimateAction.requestDelete('idle'));
    });
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