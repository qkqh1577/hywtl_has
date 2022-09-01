import {
  BusinessQuery,
} from 'business/query';
import {
  BusinessShort,
  BusinessVO,
  BusinessInvolvedProjectVO,
  RivalProjectVO
} from 'business/domain';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { BusinessAction } from 'business/action';

export interface BusinessState {
  filter?: BusinessQuery;
  page?: Page<BusinessShort>;
  list?: BusinessShort[];
  detail?: BusinessVO;
  involvedProjectList?: BusinessInvolvedProjectVO[];
  rivalProjectList?: RivalProjectVO[];
}

const initialState: BusinessState = {};

export const businessReducer = createReducer(initialState, {
  [BusinessAction.setFilter]:              (state,
                                            action
                                           ) => ({
    ...state,
    filter: action.payload.values
  }),
  [BusinessAction.setRegistrationNumber]:  (state,
                                            action
                                           ) => ({
    ...state,
    filter: action.payload.values
  }),
  [BusinessAction.setPage]:                (state,
                                            action
                                           ) => ({
    ...state,
    page: action.payload
  }),
  [BusinessAction.setInvolvedProjectList]: (state,
                                            action
                                           ) => ({
    ...state,
    involvedProjectList: action.payload
  }),
  [BusinessAction.setRivalProjectList]:    (state,
                                            action
                                           ) => ({
    ...state,
    rivalProjectList: action.payload
  }),
  [BusinessAction.setOne]:                 (state,
                                            action
                                           ) => ({
    ...state,
    detail: action.payload
  }),
});
