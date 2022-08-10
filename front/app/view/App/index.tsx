import React, {
  useEffect,
} from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Grid,
  Toolbar,
} from '@mui/material';

import logo from 'assets/logo.png';
import { AppBar } from 'layouts';
import ReactRouter from 'services/routes';
import useDialog, {
  Alert,
  Confirm
} from 'components/Dialog';
import { ThemeProvider } from '@mui/styles';
import mainTheme from 'app/view/App/theme';
import LogoutButton, { LogoutButtonProps } from 'app/view/App/LogoutButton';
import useLogin from 'app/service/loginHook';
import SearchBar from 'app/view/App/SearchBar';
import NotificationButton from 'app/view/App/NotificationButton';
import AccountButton from 'app/view/App/AccountButton';
import MenuDrawer, { MenuDrawerProps } from 'app/view/App/MenuDrawer';
import useMenu from 'app/service/menuHook';

interface Props
  extends LogoutButtonProps,
          MenuDrawerProps {
  isLoginPage: boolean;
}

export default function () {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { alert, confirm } = useDialog();
  const { user, getLoginUser, logout } = useLogin();
  const { open, menu, toggleMenu } = useMenu();

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
      isLoginPage={pathname === '/login'}
      menu={menu}
      openMenu={open}
      toggleMenu={toggleMenu}
      handleLogout={() => {
        confirm({
          children:     '로그아웃하시겠습니까?',
          confirmText:  '로그아웃',
          afterConfirm: () => {
            logout();
          }
        });
      }}
    />
  );
}

function App(props: Props) {
  const { isLoginPage } = props;

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{
        display: 'flex',
        width:   '100%'
      }}>
        <CssBaseline />
        <AppBar color="transparent" position="absolute">
          <Toolbar sx={{
            backgroundColor: '#3c3757'
          }}>
            <Grid container
              spacing={2}
              wrap="nowrap"
              sx={{
                display:        'flex',
                flexWrap:       'nowrap',
                alignContent:   'center',
                justifyContent: 'space-between',
              }}>
              <Grid item>
                <img src={logo} width="auto" height="26" alt="한양풍동실험연구소_로고" />
              </Grid>
            </Grid>
            <Grid item
              sx={{
                display:        'flex',
                flexWrap:       'nowrap',
                justifyContent: 'flex-end',
              }}>
              {!isLoginPage && (
                <>
                  <SearchBar />
                  <NotificationButton />
                  <AccountButton />
                  <LogoutButton {...props} />
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        {!isLoginPage && (<MenuDrawer {...props} />)}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
                               theme.palette.mode === 'light'
                                 ? theme.palette.grey[100]
                                 : theme.palette.grey[900],
            flexGrow:        1,
            height:          '100vh',
            overflow:        'auto',
            paddingLeft:     0,
            paddingRight:    0,
          }}>
          <Toolbar sx={{
            paddingLeft:  0,
            paddingRight: 0,
          }}
          />
          <ReactRouter />
        </Box>
      </Box>
      <Alert />
      <Confirm />
    </ThemeProvider>
  );
}
