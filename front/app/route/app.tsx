import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useDialog from 'components/Dialog';
import useLogin from 'app/service/loginHook';
import useMenu from 'app/service/menuHook';
import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import App from 'app/view/App';
import ProjectMemoDrawerRoute from 'project_memo/route/drawer';
import ProjectDrawerRoute from 'app/route/projectDrawer';
import ProjectAppBarRoute from 'app/route/projectAppBar';
import LoginUserEditModalRoute from 'app/route/loginUserEditModal';
import { useDispatch } from 'react-redux';
import { userAction, } from 'user/action';
import { LoginUser } from 'app/domain/login';
import NotificationButtonRoute from 'app/route/notificationButton';

export type OnLoginUserEditModalOpen = (loginUser: LoginUser) => void;

export default function () {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProjectPage = useMemo(() => pathname.startsWith('/project/sales-management'), [pathname]);
  const isLoginPage = useMemo(() => pathname === '/login', [pathname]);
  const { alert } = useDialog();
  const { user, getLoginUser, logout } = useLogin();
  const { open: openMenu, menu, toggleMenu } = useMenu();
  const dispatch = useDispatch();

  const onLoginUserEditModalOpen: OnLoginUserEditModalOpen = useCallback((loginUser) =>
    dispatch(userAction.editModal(loginUser)), [dispatch]);

  useEffect(() => {
    if (pathname !== '/login') {
      if (user === null) {
        alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.', () => {
          navigate('/login');
        });
        return;
      }
      if (!user) {
        getLoginUser();
      }
    }
  }, [user, pathname]);

  return (
    <App
      isLoginPage={isLoginPage}
      isProjectPage={isProjectPage}
      logoutButtonProps={{ handleLogout: logout }}
      menuDrawerProps={{
        menu,
        openMenu,
        toggleMenu
      }}
      projectDrawer={<ProjectDrawerRoute />}
      projectMemoDrawer={<ProjectMemoDrawerRoute />}
      projectAppBar={<ProjectAppBarRoute />}
      onLoginUserEditModalOpen = {onLoginUserEditModalOpen}
      loginUserEditModal={<LoginUserEditModalRoute />}
      notificationButton={<NotificationButtonRoute />}
    />
  );
}
