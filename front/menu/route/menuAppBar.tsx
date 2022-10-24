import MenuBar from 'menu/view/AppBar';
import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { menuAction } from 'menu/action';

export default function MenuBarRoute() {

  const dispatch = useDispatch();
  const { open } = useSelector((root: RootState) => root.menu);
  const toggleMenu = useCallback(() => dispatch(menuAction.toggleMenu()), [dispatch]);

  return (
    <MenuBar
      open={open}
      toggleMenu={toggleMenu}
    />
  );
}