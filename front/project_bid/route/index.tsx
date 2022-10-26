import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBidSection from 'project_bid/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectBidAction } from 'project_bid/action';
import { ProjectBidParameter } from 'project_bid/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';
import { ProjectId } from 'project/domain';

export default function ProjectBidRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { projectId, detail, requestUpdate } = useSelector((root: RootState) => root.projectBid);
  const onUpdate = useCallback((params: ProjectBidParameter) => dispatch(projectBidAction.update(params)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(projectBidAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    if (requestUpdate === ApiStatus.DONE) {
      reload(projectId);
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