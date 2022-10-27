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
import useDialog from 'dialog/hook';

export default function ProjectRivalBidListRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { projectId, list, requestPush, requestUpdate, requestDelete } = useSelector((root: RootState) => root.rivalBid);
  const onPush = useCallback(() => dispatch(rivalBidAction.push()), [dispatch]);
  const onUpdate = useCallback((params: RivalBidParameter) => dispatch(rivalBidAction.update(params)), [dispatch]);
  const onDelete = useCallback((id: RivalBidId) => dispatch(rivalBidAction.deleteOne(id)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(rivalBidAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    if (requestPush === 'done') {
      reload(projectId);
      dispatch(rivalBidAction.requestPush('idle'));
    }
    else if (requestPush === message) {
      error('등록에 실패하였습니다.');
      dispatch(rivalBidAction.requestPush('idle'));
    }
  }, [requestPush]);

  useEffect(() => {
    if (requestUpdate === 'done') {
      reload(projectId);
      dispatch(rivalBidAction.requestUpdate('idle'));
    }
    else if (requestUpdate === message) {
      error('변경에 실패하였습니다.');
      dispatch(rivalBidAction.requestUpdate('idle'));
    }
  }, [requestUpdate]);


  useEffect(() => {
    if (requestDelete === 'done') {
      reload(projectId);
      dispatch(rivalBidAction.requestDelete('idle'));
    }
    else if (requestDelete === message) {
      error('삭제에 실패하였습니다.');
      dispatch(rivalBidAction.requestDelete('idle'));
    }
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