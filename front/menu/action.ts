import { createAction } from 'typesafe-actions';
import { Menu } from 'menu/domain';

export enum MenuActionType {
  getMenu    = 'app/menu/get',
  setMenu    = 'app/menu/set',
  toggleMenu = 'app/menu-drawer/toggle',
}

export const menuAction = {
  getMenu:    createAction(MenuActionType.getMenu)(),
  setMenu:    createAction(MenuActionType.setMenu)<Menu[]>(),
  toggleMenu: createAction(MenuActionType.toggleMenu)(),
};