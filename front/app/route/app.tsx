import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useDialog from 'components/Dialog';
import React, { useEffect } from 'react';
import App from 'app/view/App';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { loginAction } from 'login/action';
import { ApiStatus } from 'components/DataFieldProps';
import AppBarRoute from 'app/route/appBar';
import ProjectDrawerRoute from 'app/route/projectDrawer';
import ProjectMemoDrawerRoute from 'project_memo/route/drawer';
import UserNotificationModalRoute from 'user_notification/route/userNotificationModal';
import LoginChangeModalRoute from 'login/route/changeModal';
import MenuDrawerRoute from 'app/route/menuDrawer';
import ProjectAddModalRoute from 'app/route/projectAddModal';

export default function () {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detail: loginUser, requestLogin } = useSelector((root: RootState) => root.login);
  const { alert } = useDialog();

  useEffect(() => {
    if (!loginUser) {
      dispatch(loginAction.requestDetail());
    }
  }, [loginUser]);

  useEffect(() => {
    if (requestLogin === ApiStatus.FAIL) {
      if (pathname !== '/login') {
        alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      }
      dispatch(loginAction.requestLogin(ApiStatus.IDLE));
    }
  }, [requestLogin]);

  return (
    <App
      appBar={<AppBarRoute />}
      menuDrawer={<MenuDrawerRoute />}
      projectDrawer={<ProjectDrawerRoute />}
      projectMemoDrawer={<ProjectMemoDrawerRoute />}
      projectAddModal={<ProjectAddModalRoute />}
      loginChangeModal={<LoginChangeModalRoute />}
      userNotificationModal={<UserNotificationModalRoute />}
    />
  );
}
