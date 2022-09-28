import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, { useEffect } from 'react';
import { ProjectStatus } from 'project_status/domain';
import { projectStatusAction } from 'project_status/action';
import ProjectStatusStatusRoute from 'project_status/route/status';

export function ProjectStatusRoute() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { projectId } = useSelector((root: RootState) => root.projectStatus);

  useEffect(() => {
    if (detail && detail.id !== projectId) {
      dispatch(projectStatusAction.setProjectId(detail.id));
      dispatch(projectStatusAction.setStatus(
        {
          estimateStatus:      detail.estimateStatus,
          estimateExpectation: detail.estimateExpectation,
          contractStatus:      detail.contractStatus,
          progressStatus:      detail.progressStatus
        } as ProjectStatus,
      ));
    }
  }, [detail, projectId]);

  return <ProjectStatusStatusRoute />;
}
