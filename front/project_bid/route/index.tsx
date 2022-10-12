import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBidSection from 'project_bid/view';
import useId from 'services/useId';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectBidAction } from 'project_bid/action';
import { ProjectId } from 'project/domain';
import { ProjectBidParameter } from 'project_bid/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectBidRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { error } = useDialog();
  const { detail, requestUpdate } = useSelector((root: RootState) => root.projectBid);
  const onUpdate = useCallback((params: ProjectBidParameter) => dispatch(projectBidAction.update(params)), [dispatch]);

  useEffect(() => {
    dispatch(projectBidAction.setProjectId(id ? ProjectId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (requestUpdate === ApiStatus.DONE) {
      dispatch(projectBidAction.setProjectId(id ? ProjectId(id) : undefined));
      dispatch(projectBidAction.requestUpdate(ApiStatus.IDLE));
    }
    else if (requestUpdate === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(projectBidAction.requestUpdate(ApiStatus.IDLE));
    }
  }, [requestUpdate]);

  return (
    <ProjectBidSection
      detail={detail}
      onUpdate={onUpdate}
    />
  );
}