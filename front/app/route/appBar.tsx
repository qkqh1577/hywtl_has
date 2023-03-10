import { useLocation } from 'react-router-dom';
import React from 'react';
import ProjectAppBarRoute from 'project/route/projectAppBar';
import NotificationButtonRoute from 'app/route/notificationButton';
import MenuBarRoute from 'menu/route/menuAppBar';
import LogoutButtonRoute from 'app/route/logoutButton';
import AccountButtonRoute from 'app/route/accountButton';
import { ColorPalette } from 'assets/theme';
import {
  AppBar as MuiAppBar,
  Box
} from '@mui/material';

export default function AppBarRoute() {

  const { pathname } = useLocation();
  const isLoginPage = pathname.startsWith('/login');
  const isPasswordResetPage = pathname.startsWith('/user/password-reset')

  if (isLoginPage || isPasswordResetPage) {
    return null;
  }

  return (
    <MuiAppBar sx={(theme) => ({
      zIndex:          theme.zIndex.drawer + 1,
      width:           '100%',
      height:          '50px',
      display:         'flex',
      padding:         0,
      flexWrap:        'nowrap',
      backgroundColor: ColorPalette._242e43
    })}>
      <Box sx={{
        display:        'flex',
        height:         '100%',
        width:          '100%',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          display: 'flex',
          height:  '100%',
        }}>
          <MenuBarRoute />
          <ProjectAppBarRoute />
        </Box>
        <Box sx={{
          display:     'flex',
          height:      '100%',
          flexWrap:    'nowrap',
          alignItems:  'center',
          marginRight: '10px',
        }}>
          <NotificationButtonRoute />
          <AccountButtonRoute />
          <LogoutButtonRoute />
        </Box>
      </Box>
    </MuiAppBar>
  );
}
