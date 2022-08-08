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
import ReactRouter from 'routes';
import useDialog, {
  Alert,
  Confirm
} from 'components/Dialog';
import { ThemeProvider } from '@mui/styles';
import mainTheme from 'App/view/App/theme';
import LogoutButton from 'App/view/App/LogoutButton';
import useLogin from 'App/service/loginHook';
import SearchBar from 'App/view/App/SearchBar';
import NotificationButton from 'App/view/App/NotificationButton';
import AccountButton from 'App/view/App/AccountButton';
import MenuDrawer from 'App/view/App/MenuDrawer';

export default function () {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { alert } = useDialog();
  const { user, getLoginUser } = useLogin();

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
              {pathname !== '/login' && (
                <>
                  <SearchBar />
                  <NotificationButton />
                  <AccountButton />
                  <LogoutButton />
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        {pathname !== '/login' && (<MenuDrawer />)}
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
};
