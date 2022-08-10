import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useCallback } from 'react';
import { Menu } from 'app/domain/menu';
import { menuAction } from 'app/domain/action';

export default function useMenu() {
  const state = useSelector((root: RootState) => root.menu);
  const { menu, open } = state;
  const dispatch = useDispatch();
  const setMenu = useCallback(
    (menu: Menu[]) => dispatch(menuAction.setMenu(menu)),
    [dispatch]
  );
  const toggleMenu = useCallback(() => dispatch(menuAction.toggleMenuOpen()), [dispatch]);

  return {
    menu,
    open,
    setMenu,
    toggleMenu,
  };
}