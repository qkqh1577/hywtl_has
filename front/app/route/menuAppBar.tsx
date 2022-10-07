import MenuBar from 'app/view/App/MenuDrawer/AppBar';
import React from 'react';
import useMenu from 'app/service/menuHook';

export default function MenuBarRoute() {

  const { open, toggleMenu } = useMenu();

  return (
    <MenuBar
      open={open}
      toggleMenu={toggleMenu}
    />
  );
}