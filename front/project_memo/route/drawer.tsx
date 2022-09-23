import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, { useCallback, } from 'react';
import { projectMemoAction } from 'project_memo/action';
import ProjectMemoDrawer from 'project_memo/view/Drawer';
import ProjectMemoDrawerFilterRoute from 'project_memo/route/filter';
import ProjectMemoDrawerFormRoute from 'project_memo/route/form';
import ProjectMemoDrawerListRoute from 'project_memo/route/list';

export default function ProjectMemoDrawerRoute() {
  const { projectId, drawer: open } = useSelector((root: RootState) => root.projectMemo);
  const dispatch = useDispatch();
  const setOpen = useCallback((open: boolean) => dispatch(projectMemoAction.setDrawer(open)), [dispatch]);


  return (
    <ProjectMemoDrawer
      open={typeof projectId !== 'undefined' && open}
      setOpen={setOpen}
      list={<ProjectMemoDrawerListRoute />}
      form={<ProjectMemoDrawerFormRoute />}
      filter={<ProjectMemoDrawerFilterRoute />}
    />
  );
}