import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, { useEffect } from 'react';
import { projectStatusAction } from 'project_status/action';
import ProjectStatusStatusRoute from 'project_status/route/status';
import ProjectStatusFailReasonAddModalRoute from 'project_status/route/failReasonAddModal';

export function ProjectStatusRoute() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { projectId } = useSelector((root: RootState) => root.projectStatus);

  useEffect(() => {
    if (detail && detail.id !== projectId) {
      dispatch(projectStatusAction.setProjectId(detail.id));
    }
  }, [detail, projectId]);

  return <>
    <ProjectStatusStatusRoute />
    <ProjectStatusFailReasonAddModalRoute />
  </>;
}
