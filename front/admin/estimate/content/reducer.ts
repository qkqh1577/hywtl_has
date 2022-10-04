import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShort,
  EstimateContentVariableVO,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { createReducer } from 'typesafe-actions';
import { EstimateContentAction } from 'admin/estimate/content/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface EstimateContentState {
  filter?: EstimateContentQuery;
  id?: EstimateContentId;
  list?: EstimateContentShort[];
  detail?: EstimateContentVO;
  variableList?: EstimateContentVariableVO[];
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
}

const initialEstimateContentState: EstimateContentState = {
  requestDelete: ApiStatus.IDLE,
  requestUpsert: ApiStatus.IDLE,
};

export const estimateContentReducer = createReducer(initialEstimateContentState, {
  [EstimateContentAction.setFilter]: (state,
                                      action
                                     ) => ({
      ...state,
      filter: action.payload,
    }
  ),
  [EstimateContentAction.setId]:     (state,
                                      action
                                     ) => ({
    ...state,
    id: action.payload,
  }),
  [EstimateContentAction.setList]:   (state,
                                      action
                                     ) => ({
    ...state,
    list: action.payload,
  }),
  [EstimateContentAction.setOne]:    (state,
                                      action
                                     ) => ({
    ...state,
    detail: action.payload,
  }),

  [EstimateContentAction.setVariableList]: (state,
                                            action
                                           ) => ({
    ...state,
    variableList: action.payload,
  }),
  [EstimateContentAction.requestUpsert]:   (state,
                                            action
                                           ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [EstimateContentAction.requestDelete]:   (state,
                                            action
                                           ) => ({
    ...state,
    requestDelete: action.payload,
  })
});
