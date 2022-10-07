import React from 'react';
import MenuDrawer from 'app/view/App/MenuDrawer';
import useMenu from 'app/service/menuHook';
import { useLocation } from 'react-router-dom';

export default function MenuDrawerRoute() {

  const { open, menu } = useMenu();
  const { pathname } = useLocation();
  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage) {
    return null;
  }

  return (
    <MenuDrawer
      menu={menu}
      open={open}
    />
  );
}