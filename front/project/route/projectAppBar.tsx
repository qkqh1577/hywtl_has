import ProjectAppBar from 'project/view/Drawer/AppBar';
import React, {
  useCallback,
  useMemo
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useLocation } from 'react-router-dom';
import { projectAction } from 'project/action';

export default function ProjectAppBarRoute() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isProjectPage = useMemo(() => pathname.startsWith('/project/'), [pathname]);
  const { drawerOpen } = useSelector((root: RootState) => root.project);
  const toggle = useCallback(() => dispatch(projectAction.toggleDrawer()), [dispatch]);
  const openAddModal = useCallback(() => dispatch(projectAction.setAddModal(true)), [dispatch]);

  if (!isProjectPage) {
    return null;
  }

  return (
    <ProjectAppBar
      open={drawerOpen}
      toggle={toggle}
      openAddModal={openAddModal}
    />
  );
}