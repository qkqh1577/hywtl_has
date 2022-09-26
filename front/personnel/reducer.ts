import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import {
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { createReducer } from 'typesafe-actions';
import { PersonnelAction } from 'personnel/action';

export interface PersonnelState {
  detail?: PersonnelVO;
  filter?: PersonnelQuery;
  page?: Page<PersonnelShortVO>;
}

const initialState: PersonnelState = {};

export const personnelReducer = createReducer(initialState, {
  [PersonnelAction.setOne]:          (state,
                                      action
                                     ) => ({
    ...state,
    detail: action.payload,

  }),
  [PersonnelAction.setFilter]:       (state,
                                      action
                                     ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [PersonnelAction.setPage]:         (state,
                                      action
                                     ) => ({
    ...state,
    page: action.payload,
  })
});
