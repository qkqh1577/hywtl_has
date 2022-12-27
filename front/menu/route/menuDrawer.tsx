import React from 'react';
import MenuDrawer from 'menu/view/MenuDrawer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function MenuDrawerRoute() {

  const { open, list } = useSelector((root: RootState) => root.menu);
  const { pathname } = useLocation();
  const isLoginPage = pathname.startsWith('/login');
  const isPasswordResetPage = pathname.startsWith('/user/password-reset')

  if (isLoginPage || isPasswordResetPage) {
    return null;
  }

  return (
    <MenuDrawer
      menu={list}
      open={open}
    />
  );
}
