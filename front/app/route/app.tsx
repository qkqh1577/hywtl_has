import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useDialog from 'components/Dialog';
import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { loginAction } from 'login/action';
import { ApiStatus } from 'components/DataFieldProps';
import AppBarRoute from 'app/route/appBar';
import ProjectDrawerRoute from 'project/route/projectDrawer';
import ProjectMemoDrawerRoute from 'project_memo/route/drawer';
import UserNotificationModalRoute from 'user_notification/route/userNotificationModal';
import LoginChangeModalRoute from 'login/route/changeModal';
import MenuDrawerRoute from 'menu/route/menuDrawer';
import ProjectAddModalRoute from 'project/route/projectAddModal';
import { menuAction } from 'menu/action';
import ReactRouter from 'services/routes';
import { Box } from '@mui/material';

export default function () {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detail: loginUser, requestLogin } = useSelector((root: RootState) => root.login);
  const { alert } = useDialog();
  const isLoginPage = pathname.startsWith('/login');

  useEffect(() => {
    if (!loginUser) {
      dispatch(loginAction.requestDetail());
      dispatch(menuAction.getMenu());
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
    <Box sx={{
      display:  'flex',
      width:    '100%',
      height:   '100vh',
      overflow: 'hidden'
    }}>
      <AppBarRoute />
      <MenuDrawerRoute />
      <ProjectDrawerRoute />
      <Box component="main"
        sx={{
          flexGrow:     1,
          height:       '100vh',
          overflow:     'hidden',
          paddingLeft:  0,
          paddingRight: 0,
          paddingTop:   !isLoginPage ? '50px' : 0,
        }}>
        <ReactRouter />
      </Box>
      <ProjectMemoDrawerRoute />
      <ProjectAddModalRoute />
      <LoginChangeModalRoute />
      <UserNotificationModalRoute />
    </Box>
  );

}
