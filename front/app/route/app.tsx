import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useDialog from 'dialog/hook';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { loginAction } from 'login/action';
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
import { closeStatus } from 'components/DataFieldProps';
import PasswordChangeModalRoute from 'login/route/passwordChangeModal';
import LoginModalRoute from 'login/route/loginModalRoute';
import { useInterval } from 'hook/useInterval';

const MemoizedProjectDrawerRoute = React.memo(ProjectDrawerRoute);

export default function () {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detail: loginUser, requestLogin, isOpenLoginModal } = useSelector((root: RootState) => root.login);
  const { error, alert } = useDialog();
  const isLoginPage = pathname.startsWith('/login');
  const isPageRelationWithPassword = pathname.startsWith('/user/password-reset');
  const openLoginModal = useCallback(() => dispatch(loginAction.setLoginModal(true)), [dispatch]);
  useEffect(() => {
    if (!loginUser) {
      dispatch(menuAction.getMenu());
    }
  }, [loginUser]);

  useEffect(() => {
    closeStatus(
      requestLogin,
      undefined,
      () => {
        dispatch(loginAction.requestLogin('idle'));
      },
      () => {
        if (pathname !== '/login') {
          openLoginModal();
          // error('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
          // navigate('/login');
        }
      });
  }, [requestLogin]);

  useEffect(() => {
    const interval = useInterval(() => {
      if (loginUser) {
        dispatch(loginAction.setDetail(undefined));
        openLoginModal();
      }
    }, 60000);
    interval.start();

    document.addEventListener('click', () => {
      console.log('click');
      interval.stop();
      interval.restart();
    });

    document.addEventListener('scroll', () => {
      console.log('scroll');
      interval.stop();
      interval.restart();
    }, { passive: true });

    document.addEventListener('keydown', () => {
      console.log('key down');
      interval.stop();
      interval.restart();
    });

    document.addEventListener('mousemove', () => {
      console.log('mousemove');
      interval.stop();
      interval.restart();
    });


  }, [loginUser]);

  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      height:   '100vh',
      overflow: 'hidden'
    }}>
      <AppBarRoute />
      <MenuDrawerRoute />
      <MemoizedProjectDrawerRoute />
      <Box
        component="main"
        sx={{
          flexGrow:     1,
          height:       '100vh',
          overflow:     'hidden',
          paddingLeft:  0,
          paddingRight: 0,
          paddingTop:   !(isLoginPage || isPageRelationWithPassword) ? '50px' : 0,
        }}>
        <ReactRouter />
      </Box>
      <ProjectMemoDrawerRoute />
      <ProjectAddModalRoute />
      <LoginChangeModalRoute />
      <PasswordChangeModalRoute />
      <UserNotificationModalRoute />
      <LoginModalRoute />
    </Box>
  );
}
