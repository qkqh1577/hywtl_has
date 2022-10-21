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
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectRivalBidListRoute() {

  const id = useId();
  const dispatch = useDispatch();
  const { error } = useDialog();
  const { list, requestPush, requestUpdate, requestDelete } = useSelector((root: RootState) => root.rivalBid);
  const onPush = useCallback(() => dispatch(rivalBidAction.push()), [dispatch]);
  const onUpdate = useCallback((params: RivalBidParameter) => dispatch(rivalBidAction.update(params)), [dispatch]);
  const onDelete = useCallback((id: RivalBidId) => dispatch(rivalBidAction.deleteOne(id)), [dispatch]);

  useEffect(() => {
    dispatch(rivalBidAction.setProjectId(id ? ProjectId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (requestPush === ApiStatus.DONE) {
      dispatch(rivalBidAction.setProjectId(id ? ProjectId(id) : undefined));
      dispatch(rivalBidAction.requestPush(ApiStatus.IDLE));
    }
    else if (requestPush === ApiStatus.FAIL) {
      error('등록에 실패하였습니다.');
      dispatch(rivalBidAction.requestPush(ApiStatus.IDLE));
    }
  }, [requestPush]);

  useEffect(() => {
    if (requestUpdate === ApiStatus.DONE) {
      dispatch(rivalBidAction.setProjectId(id ? ProjectId(id) : undefined));
      dispatch(rivalBidAction.requestUpdate(ApiStatus.IDLE));
    }
    else if (requestUpdate === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(rivalBidAction.requestUpdate(ApiStatus.IDLE));
    }
  }, [requestUpdate]);


  useEffect(() => {
    if (requestDelete === ApiStatus.DONE) {
      dispatch(rivalBidAction.setProjectId(id ? ProjectId(id) : undefined));
      dispatch(rivalBidAction.requestDelete(ApiStatus.IDLE));
    }
    else if (requestDelete === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(rivalBidAction.requestDelete(ApiStatus.IDLE));
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