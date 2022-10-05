import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useDialog from 'components/Dialog';
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
import {
  useDispatch,
  useSelector
} from 'react-redux';
import NotificationButtonRoute from 'app/route/notificationButton';
import UserNotificationModalRoute from 'user_notification/route/userNotificationModal';
import { RootState } from 'services/reducer';
import { loginAction } from 'login/action';
import { ApiStatus } from 'components/DataFieldProps';


export default function () {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProjectPage = useMemo(() => pathname.startsWith('/project/sales-management'), [pathname]);
  const isLoginPage = useMemo(() => pathname === '/login', [pathname]);
  const dispatch = useDispatch();
  const { detail: loginUser, requestLogin } = useSelector((root: RootState) => root.login);
  const { alert } = useDialog();
  const { open: openMenu, menu, toggleMenu } = useMenu();
  const logout = useCallback(() => dispatch(loginAction.logout()), [dispatch]);
  const onLoginUserEditModalOpen = useCallback(() => dispatch(loginAction.userModal(true)), [dispatch]);

  useEffect(() => {
    if (!loginUser) {
      dispatch(loginAction.requestDetail());
    }
  }, [loginUser]);

  useEffect(() => {
    if (requestLogin === ApiStatus.FAIL) {
      dispatch(loginAction.requestLogin(ApiStatus.IDLE));
      alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  }, [requestLogin]);

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
      onLoginUserEditModalOpen={onLoginUserEditModalOpen}
      loginChangeModal={<LoginUserEditModalRoute />}
      notificationButton={<NotificationButtonRoute />}
      userNotificationModal={<UserNotificationModalRoute />}
    />
  );
}
