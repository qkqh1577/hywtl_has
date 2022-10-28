import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectRivalBidList from 'rival_bid/view/RivalBidList';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { rivalBidAction } from 'rival_bid/action';
import { RivalBidParameter } from 'rival_bid/parameter';
import { RivalBidId } from 'rival_bid/domain';
import { ProjectId } from 'project/domain';
import { RootState } from 'services/reducer';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectRivalBidListRoute() {

  const dispatch = useDispatch();
  const { projectId, list, requestPush, requestUpdate, requestDelete } = useSelector((root: RootState) => root.rivalBid);
  const onPush = useCallback(() => dispatch(rivalBidAction.push()), [dispatch]);
  const onUpdate = useCallback((params: RivalBidParameter) => dispatch(rivalBidAction.update(params)), [dispatch]);
  const onDelete = useCallback((id: RivalBidId) => dispatch(rivalBidAction.deleteOne(id)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(rivalBidAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    closeStatus(requestPush, () => {
      reload(projectId);
    }, () => {
      dispatch(rivalBidAction.requestPush('idle'));
    });
  }, [requestPush]);

  useEffect(() => {
    closeStatus(requestUpdate, () => {
      reload(projectId);
    }, () => {
      dispatch(rivalBidAction.requestUpdate('idle'));
    });
  }, [requestUpdate]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      reload(projectId);
    }, () => {
      dispatch(rivalBidAction.requestDelete('idle'));
    });
  }, [requestDelete]);

  return (
    <ProjectRivalBidList
      list={list}
      onPush={onPush}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}