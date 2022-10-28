import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import {
  PersonnelId,
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { createReducer } from 'typesafe-actions';
import { PersonnelActionType } from 'personnel/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface PersonnelState {
  id?: PersonnelId;
  detail?: PersonnelVO;
  filter?: PersonnelQuery;
  page?: Page<PersonnelShortVO>;
  requestUpdate: ApiStatus;
}

const initialState: PersonnelState = {
  requestUpdate: 'idle',
};

export const personnelReducer = createReducer(initialState, {
  [PersonnelActionType.setId]:         (state,
                                        action
                                       ) => ({
    ...state,
    id: action.payload,
  }),
  [PersonnelActionType.setOne]:        (state,
                                        action
                                       ) => ({
    ...state,
    detail: action.payload,

  }),
  [PersonnelActionType.setFilter]:     (state,
                                        action
                                       ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [PersonnelActionType.setPage]:       (state,
                                        action
                                       ) => ({
    ...state,
    page: action.payload,
  }),
  [PersonnelActionType.requestUpdate]: (state,
                                        action
                                       ) => ({
    ...state,
    requestUpdate: action.payload,
  })
});
