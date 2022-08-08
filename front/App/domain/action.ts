import { createAction } from 'typesafe-actions';
import { LoginParameter } from 'App/domain/parameter';
import { LoginUser } from 'App/domain/loginEntity';
import { Menu } from 'App/domain/menu';

export enum LoginAction {
  login          = 'app/login',
  getLoginUser   = 'app/getLoginUser',
  setLoginUser   = 'app/setLoginUser',
  logout         = 'app/logout',
  clearLoginUser = 'app/clearLoginUser'
}

export const loginAction = {
  login:          createAction(LoginAction.login)<LoginParameter>(),
  getLoginUser:   createAction(LoginAction.getLoginUser)(),
  setLoginUser:   createAction(LoginAction.setLoginUser)<LoginUser | null>(),
  logout:         createAction(LoginAction.logout)(),
  clearLoginUser: createAction(LoginAction.clearLoginUser)(),
};

export enum MenuAction {
  setMenu        = 'app/setMenu',
  toggleMenuOpen = 'app/toggleMenuOpen',
}

export const menuAction = {
  setMenu:        createAction(MenuAction.setMenu)<Menu[]>(),
  toggleMenuOpen: createAction(MenuAction.toggleMenuOpen)(),
};