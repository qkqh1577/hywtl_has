import { Menu } from 'menu/domain';
import { MenuActionType } from 'menu/action';
import { createReducer } from 'typesafe-actions';

export interface MenuState {
  list: Menu[];
  open: boolean;
}

const initial: MenuState = {
  list: [],
  open: true,
};

export const menuReducer = createReducer(initial, {
  [MenuActionType.setMenu]:    (state,
                                action
                               ) => ({
    ...state,
    list: action.payload,
  }),
  [MenuActionType.toggleMenu]: (state) => ({
    ...state,
    open: !state.open
  })
});