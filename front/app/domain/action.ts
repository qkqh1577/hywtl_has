import { createAction } from 'typesafe-actions';
import { Menu } from 'app/domain/menu';


export enum MenuAction {
  setMenu        = 'app/setMenu',
  toggleMenuOpen = 'app/toggleMenuOpen',
}

export const menuAction = {
  setMenu:        createAction(MenuAction.setMenu)<Menu[]>(),
  toggleMenuOpen: createAction(MenuAction.toggleMenuOpen)(),
};

export enum ProjectDrawerAction {
  toggleMenu   = 'app/project/toggle',
  toggleFilter = 'app/project/filter/toggle',
}

export const projectDrawerAction = {
  toggleMenu:   createAction(ProjectDrawerAction.toggleMenu)(),
  toggleFilter: createAction(ProjectDrawerAction.toggleFilter)(),
};