import { createAction } from 'typesafe-actions';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShort,
  EstimateContentVariableVO,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum EstimateContentAction {
  setFilter           = 'admin/estimate/content/filter/set',
  setList             = 'admin/estimate/content/list/set',
  setId               = 'admin/estimate/content/id/set',
  setOne              = 'admin/estimate/content/one/set',
  upsert              = 'admin/estimate/content/upsert',
  requestUpsert       = 'admin/estimate/content/upsert/request',
  deleteOne           = 'admin/estimate/content/delete',
  requestDelete       = 'admin/estimate/content/delete/request',
  requestVariableList = 'admin/estimate/content/variable-list/request',
  setVariableList     = 'admin/estimate/content/variable-list/set',
}

export const estimateContentAction = {
  setFilter:           createAction(EstimateContentAction.setFilter)<EstimateContentQuery>(),
  setList:             createAction(EstimateContentAction.setList)<EstimateContentShort[]>(),
  setId:               createAction(EstimateContentAction.setId)<EstimateContentId | undefined>(),
  setOne:              createAction(EstimateContentAction.setOne)<EstimateContentVO | undefined>(),
  upsert:              createAction(EstimateContentAction.upsert)<EstimateContentParameter>(),
  requestUpsert:       createAction(EstimateContentAction.requestUpsert)<ApiStatus>(),
  deleteOne:           createAction(EstimateContentAction.deleteOne)(),
  requestDelete:       createAction(EstimateContentAction.requestDelete)<ApiStatus>(),
  setVariableList:     createAction(EstimateContentAction.setVariableList)<EstimateContentVariableVO[]>(),
  requestVariableList: createAction(EstimateContentAction.requestVariableList)(),
};
