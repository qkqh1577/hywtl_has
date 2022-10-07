import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import {
  EstimateTemplateId,
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { createReducer } from 'typesafe-actions';
import { EstimateTemplateAction } from 'admin/estimate/template/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface EstimateTemplateState {
  filter?: EstimateTemplateQuery;
  list?: EstimateTemplateShort[];
  detail?: EstimateTemplateVO;
  id?: EstimateTemplateId;
  seqModal: boolean;
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
  requestChangeSeq: ApiStatus;
}

const initialEstimateTemplateState: EstimateTemplateState = {
  seqModal:         false,
  requestUpsert:    ApiStatus.IDLE,
  requestDelete:    ApiStatus.IDLE,
  requestChangeSeq: ApiStatus.IDLE,
};

export const estimateTemplateReducer = createReducer(initialEstimateTemplateState, {
  [EstimateTemplateAction.setFilter]:        (state,
                                              action
                                             ) => ({
    ...state,
    filter: action.payload,
  }),
  [EstimateTemplateAction.setId]:            (state,
                                              action
                                             ) => ({
    ...state,
    id: action.payload,
  }),
  [EstimateTemplateAction.setList]:          (state,
                                              action
                                             ) => ({
    ...state,
    list: action.payload,
  }),
  [EstimateTemplateAction.setOne]:           (state,
                                              action
                                             ) => ({
    ...state,
    detail: action.payload
  }),
  [EstimateTemplateAction.seqModal]:         (state,
                                              action
                                             ) => ({
    ...state,
    seqModal: action.payload,
  }),
  [EstimateTemplateAction.requestUpsert]:    (state,
                                              action
                                             ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [EstimateTemplateAction.requestDelete]:    (state,
                                              action
                                             ) => ({
    ...state,
    requestDelete: action.payload,
  }),
  [EstimateTemplateAction.requestChangeSeq]: (state,
                                              action
                                             ) => ({
    ...state,
    requestChangeSeq: action.payload,
  })
});