import { useLocation } from 'react-router-dom';
import React from 'react';
import AppBar from 'app/view/App/Bar';
import ProjectAppBarRoute from 'app/route/projectAppBar';
import NotificationButtonRoute from 'app/route/notificationButton';
import MenuBarRoute from 'app/route/menuAppBar';
import LogoutButtonRoute from 'app/route/logoutButton';
import AccountButtonRoute from 'app/route/accountButton';

export default function AppBarRoute() {

  const { pathname } = useLocation();
  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage) {
    return null;
  }

  return (
    <>
      <AppBar
        projectAppBar={<ProjectAppBarRoute />}
        logoutButton={<LogoutButtonRoute />}
        menuDrawerBar={<MenuBarRoute />}
        accountButton={<AccountButtonRoute />}
        notificationButton={<NotificationButtonRoute />}
      />
    </>

  );
}