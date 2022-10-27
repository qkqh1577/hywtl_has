import { BusinessQuery, } from 'business/query';
import {
  BusinessId,
  BusinessInvolvedProjectVO,
  BusinessShortVO,
  BusinessVO,
  RivalProjectVO
} from 'business/domain';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { BusinessActionType } from 'business/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface BusinessState {
  filter?: BusinessQuery;
  page?: Page<BusinessShortVO>;
  list?: BusinessShortVO[];
  detail?: BusinessVO;
  involvedProjectList?: BusinessInvolvedProjectVO[];
  rivalProjectList?: RivalProjectVO[];
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
  id?: BusinessId;
}

const initialState: BusinessState = {
  requestUpsert: 'idle',
  requestDelete: 'idle',
};

export const businessReducer = createReducer(initialState, {
  [BusinessActionType.setFilter]:              (state,
                                                action
                                               ) => ({
    ...state,
    filter: action.payload.values
  }),
  [BusinessActionType.setRegistrationNumber]:  (state,
                                                action
                                               ) => ({
    ...state,
    filter: action.payload.values
  }),
  [BusinessActionType.setId]:                  (state,
                                                action
                                               ) => ({
    ...state,
    id: action.payload,
  }),
  [BusinessActionType.setPage]:                (state,
                                                action
                                               ) => ({
    ...state,
    page: action.payload
  }),
  [BusinessActionType.setInvolvedProjectList]: (state,
                                                action
                                               ) => ({
    ...state,
    involvedProjectList: action.payload
  }),
  [BusinessActionType.setRivalProjectList]:    (state,
                                                action
                                               ) => ({
    ...state,
    rivalProjectList: action.payload
  }),
  [BusinessActionType.setOne]:                 (state,
                                                action
                                               ) => ({
    ...state,
    detail: action.payload
  }),
  [BusinessActionType.requestUpsert]:          (state,
                                                action
                                               ) => ({
    ...state,
    requestUpsert: action.payload
  }),
  [BusinessActionType.requestDelete]:          (state,
                                                action
                                               ) => ({
    ...state,
    requestDelete: action.payload
  })
});
