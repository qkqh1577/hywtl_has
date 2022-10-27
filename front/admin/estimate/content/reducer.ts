import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShortVO,
  EstimateContentVariableVO,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { createReducer } from 'typesafe-actions';
import { EstimateContentActionType } from 'admin/estimate/content/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface EstimateContentState {
  filter?: EstimateContentQuery;
  id?: EstimateContentId;
  list?: EstimateContentShortVO[];
  detail?: EstimateContentVO;
  variableList?: EstimateContentVariableVO[];
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
}

const initial: EstimateContentState = {
  requestDelete: 'idle',
  requestUpsert: 'idle',
};

export const estimateContentReducer = createReducer(initial, {
  [EstimateContentActionType.setFilter]: (state,
                                          action
                                         ) => ({
      ...state,
      filter: action.payload,
    }
  ),
  [EstimateContentActionType.setId]:     (state,
                                          action
                                         ) => ({
    ...state,
    id: action.payload,
  }),
  [EstimateContentActionType.setList]:   (state,
                                          action
                                         ) => ({
    ...state,
    list: action.payload,
  }),
  [EstimateContentActionType.setOne]:    (state,
                                          action
                                         ) => ({
    ...state,
    detail: action.payload,
  }),

  [EstimateContentActionType.setVariableList]: (state,
                                                action
                                               ) => ({
    ...state,
    variableList: action.payload,
  }),
  [EstimateContentActionType.requestUpsert]:   (state,
                                                action
                                               ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [EstimateContentActionType.requestDelete]:   (state,
                                                action
                                               ) => ({
    ...state,
    requestDelete: action.payload,
  })
});
