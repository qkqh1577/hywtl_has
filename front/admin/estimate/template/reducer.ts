import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import {
  EstimateTemplateId,
  EstimateTemplateShortVO,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { createReducer } from 'typesafe-actions';
import { EstimateTemplateActionType } from 'admin/estimate/template/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface EstimateTemplateState {
  filter?: EstimateTemplateQuery;
  list?: EstimateTemplateShortVO[];
  detail?: EstimateTemplateVO;
  id?: EstimateTemplateId;
  seqModal: boolean;
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
  requestChangeSeq: ApiStatus;
}

const initial: EstimateTemplateState = {
  seqModal:         false,
  requestUpsert:    ApiStatus.IDLE,
  requestDelete:    ApiStatus.IDLE,
  requestChangeSeq: ApiStatus.IDLE,
};

export const estimateTemplateReducer = createReducer(initial, {
  [EstimateTemplateActionType.setFilter]:        (state,
                                                  action
                                                 ) => ({
    ...state,
    filter: action.payload,
  }),
  [EstimateTemplateActionType.setId]:            (state,
                                                  action
                                                 ) => ({
    ...state,
    id: action.payload,
  }),
  [EstimateTemplateActionType.setList]:          (state,
                                                  action
                                                 ) => ({
    ...state,
    list: action.payload,
  }),
  [EstimateTemplateActionType.setOne]:           (state,
                                                  action
                                                 ) => ({
    ...state,
    detail: action.payload
  }),
  [EstimateTemplateActionType.seqModal]:         (state,
                                                  action
                                                 ) => ({
    ...state,
    seqModal: action.payload,
  }),
  [EstimateTemplateActionType.requestUpsert]:    (state,
                                                  action
                                                 ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [EstimateTemplateActionType.requestDelete]:    (state,
                                                  action
                                                 ) => ({
    ...state,
    requestDelete: action.payload,
  }),
  [EstimateTemplateActionType.requestChangeSeq]: (state,
                                                  action
                                                 ) => ({
    ...state,
    requestChangeSeq: action.payload,
  })
});