import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import {
  PersonnelId,
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { createReducer } from 'typesafe-actions';
import { PersonnelAction } from 'personnel/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface PersonnelState {
  id?: PersonnelId;
  detail?: PersonnelVO;
  filter?: PersonnelQuery;
  page?: Page<PersonnelShortVO>;
  requestUpdate: ApiStatus;
}

const initialState: PersonnelState = {
  requestUpdate: ApiStatus.IDLE,
};

export const personnelReducer = createReducer(initialState, {
  [PersonnelAction.setId]:         (state,
                                    action
                                   ) => ({
    ...state,
    id: action.payload,
  }),
  [PersonnelAction.setOne]:        (state,
                                    action
                                   ) => ({
    ...state,
    detail: action.payload,

  }),
  [PersonnelAction.setFilter]:     (state,
                                    action
                                   ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [PersonnelAction.setPage]:       (state,
                                    action
                                   ) => ({
    ...state,
    page: action.payload,
  }),
  [PersonnelAction.requestUpdate]: (state,
                                    action
                                   ) => ({
    ...state,
    requestUpdate: action.payload,
  })
});
