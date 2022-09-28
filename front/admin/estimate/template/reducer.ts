import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import {
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { createReducer } from 'typesafe-actions';
import { EstimateTemplateAction } from 'admin/estimate/template/action';

export interface EstimateTemplateState {
  filter?: EstimateTemplateQuery;
  list?: EstimateTemplateShort[];
  detail?: EstimateTemplateVO;
}

const initialEstimateTemplateState: EstimateTemplateState = {};

export const estimateTemplateReducer = createReducer(initialEstimateTemplateState, {
  [EstimateTemplateAction.setFilter]: (state,
                                       action
                                      ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [EstimateTemplateAction.setList]:   (state,
                                       action
                                      ) => ({
    ...state,
    list: action.payload,
  }),
  [EstimateTemplateAction.setOne]:    (state,
                                       action
                                      ) => ({
    ...state,
    detail: action.payload
  }),
});