import ProjectAppBar from 'app/view/App/ProjectDrawer/AppBar';
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
import { projectAction } from 'project/action';

export default function ProjectAppBarRoute() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isProjectPage = useMemo(() => pathname.startsWith('/project/'), [pathname]);
  const { open } = useSelector((root: RootState) => root.projectDrawer);
  const toggle = useCallback(() => dispatch(projectDrawerAction.toggleMenu()), [dispatch]);
  const openAddModal = useCallback(() => dispatch(projectAction.setAddModal(true)), [dispatch]);

  if (!isProjectPage) {
    return null;
  }

  return (
    <ProjectAppBar
      open={open}
      toggle={toggle}
      openAddModal={openAddModal}
    />
  );
}