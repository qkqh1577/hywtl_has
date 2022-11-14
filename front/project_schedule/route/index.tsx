import React, { useEffect, } from 'react';
import { AppRoute } from 'services/routes';
import ProjectContainer from 'project/route/container';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import ProjectScheduleAddModalRoute from 'project_schedule/route/addModal';
import ProjectScheduleDetailModalRoute from 'project_schedule/route/detailModal';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import ProjectScheduleRoute from 'project_schedule/route/schedule';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { projectId } = useSelector((root: RootState) => root.projectSchedule);

  useEffect(() => {
    if (id && id !== projectId) {
      dispatch(projectScheduleAction.setProjectId(ProjectId(id)));
    }
    else {
      dispatch(projectScheduleAction.setProjectId(undefined));

    }
  }, [id]);

  return (
    <ProjectContainer>
      <ProjectScheduleRoute />
      <ProjectScheduleAddModalRoute />
      <ProjectScheduleDetailModalRoute />
    </ProjectContainer>
  );
}

const projectScheduleRoute: AppRoute = {
  path:    '/project/sales-management/:id/schedule',
  element: <Element />
};
export default projectScheduleRoute;
