import ProjectAppBar from 'app/view/App/ProjectDrawer/AppBar';
import ProjectAddModalRoute from 'app/route/projectAddModal';
import React, {
  useCallback,
  useMemo
} from 'react';
import { projectDrawerAction } from 'app/domain/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useLocation } from 'react-router-dom';

export default function ProjectAppBarRoute() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isProjectPage = useMemo(() => pathname.startsWith('/project/sales-management'), [pathname]);
  const { open } = useSelector((root: RootState) => root.projectDrawer);
  const toggle = useCallback(() => dispatch(projectDrawerAction.toggleMenu()), [dispatch]);

  if (!isProjectPage) {
    return null;
  }

  return (
    <ProjectAppBar
      open={open}
      toggle={toggle}
      projectAddModal={<ProjectAddModalRoute />}
    />
  );
}