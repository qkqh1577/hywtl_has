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
import { ProjectId } from 'project/domain';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectBidRoute() {

  const dispatch = useDispatch();
  const { projectId, detail, requestUpdate } = useSelector((root: RootState) => root.projectBid);
  const onUpdate = useCallback((params: ProjectBidParameter) => dispatch(projectBidAction.update(params)), [dispatch]);
  const reload = useCallback((projectId: ProjectId | undefined) => dispatch(projectBidAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    closeStatus(requestUpdate, () => {
      reload(projectId);
    }, () => {
      dispatch(projectBidAction.requestUpdate('idle'));
    });
  }, [requestUpdate]);

  return (
    <ProjectBidSection
      detail={detail}
      onUpdate={onUpdate}
    />
  );
}