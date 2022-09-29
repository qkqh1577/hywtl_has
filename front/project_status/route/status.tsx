import React from 'react';
import ProjectContainerStatusBar from 'project_status/view/Status';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectStatusEvent } from 'project_status/action';

export default function ProjectStatusStatusRoute() {
  const dispatch = useDispatch();
  const { status } = useSelector((root: RootState) => root.projectStatus);

  return (
    <ProjectContainerStatusBar
      status={status}
      onChange={(status) => {
        dispatch(projectStatusEvent.changeStatus(status));
      }}
    />
  );
}
