import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { projectMemoAction } from 'project_memo/action';
import ProjectMemoDrawer from 'project_memo/view/Drawer';
import ProjectMemoDrawerFilterRoute from 'project_memo/route/filter';
import ProjectMemoDrawerFormRoute from 'project_memo/route/form';
import ProjectMemoDrawerListRoute from 'project_memo/route/list';
import { useLocation } from 'react-router-dom';
import { ProjectId } from 'project/domain';

export default function ProjectMemoDrawerRoute() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useSelector((root: RootState) => root.project);
  const { projectId, open } = useSelector((root: RootState) => root.projectMemo);
  const setOpen = useCallback((open: boolean) => dispatch(projectMemoAction.setDrawer(open)), [dispatch]);
  const isProjectPage = pathname.startsWith('/project/');


  useEffect(() => {
    dispatch(projectMemoAction.setProjectId(isProjectPage && id ? ProjectId(id) : undefined));
  }, [isProjectPage, id]);

  useEffect(() => {
    if (projectId) {
      dispatch(projectMemoAction.setDrawer(true));
    }
  }, [projectId]);

  if (!isProjectPage || !projectId) {
    return null;
  }

  return (
    <ProjectMemoDrawer
      open={!!projectId && open}
      setOpen={setOpen}
      list={<ProjectMemoDrawerListRoute />}
      form={<ProjectMemoDrawerFormRoute />}
      filter={<ProjectMemoDrawerFilterRoute />}
    />
  );
}