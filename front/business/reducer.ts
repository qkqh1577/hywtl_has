import { BusinessQuery, } from 'business/query';
import {
  BusinessId,
  BusinessInvolvedProjectVO,
  BusinessShort,
  BusinessVO,
  RivalProjectVO
} from 'business/domain';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { BusinessAction } from 'business/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface BusinessState {
  filter?: BusinessQuery;
  page?: Page<BusinessShort>;
  list?: BusinessShort[];
  detail?: BusinessVO;
  involvedProjectList?: BusinessInvolvedProjectVO[];
  rivalProjectList?: RivalProjectVO[];
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
  id?: BusinessId;
}

const initialState: BusinessState = {
  requestUpsert: ApiStatus.IDLE,
  requestDelete: ApiStatus.IDLE,
};

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
  [BusinessAction.setId]:                  (state,
                                            action
                                           ) => ({
    ...state,
    id: action.payload,
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
  [BusinessAction.requestUpsert]:          (state,
                                            action
                                           ) => ({
    ...state,
    requestUpsert: action.payload
  }),
  [BusinessAction.requestDelete]:          (state,
                                            action
                                           ) => ({
    ...state,
    requestDelete: action.payload
  })
});
