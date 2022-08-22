import { EstimateContentQuery } from 'admin/estimate/content/query';
import { EstimateContentShort } from 'admin/estimate/content/domain';
import {
  createReducer
} from 'typesafe-actions';
import { EstimateContentAction } from 'admin/estimate/content/action';

export interface EstimateContentState {
  filter?: EstimateContentQuery;
  list?: EstimateContentShort[];
}

const initialEstimateContentState: EstimateContentState = {};

export const estimateContentReducer = createReducer(initialEstimateContentState, {
  [EstimateContentAction.setFilter]: (state,
                                      action
                                     ) => ({
    ...state,
    filter: action.payload.values
  }),
  [EstimateContentAction.setList]: (state, action) => (
    {
      ...state,
      list: action.payload,
    }
  )
})
