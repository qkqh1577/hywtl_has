import { createAction } from 'typesafe-actions';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShortVO,
  EstimateContentVariableVO,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum EstimateContentActionType {
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
  setFilter:           createAction(EstimateContentActionType.setFilter)<EstimateContentQuery>(),
  setList:             createAction(EstimateContentActionType.setList)<EstimateContentShortVO[]>(),
  setId:               createAction(EstimateContentActionType.setId)<EstimateContentId | undefined>(),
  setOne:              createAction(EstimateContentActionType.setOne)<EstimateContentVO | undefined>(),
  upsert:              createAction(EstimateContentActionType.upsert)<EstimateContentParameter>(),
  requestUpsert:       createAction(EstimateContentActionType.requestUpsert)<ApiStatus>(),
  deleteOne:           createAction(EstimateContentActionType.deleteOne)(),
  requestDelete:       createAction(EstimateContentActionType.requestDelete)<ApiStatus>(),
  setVariableList:     createAction(EstimateContentActionType.setVariableList)<EstimateContentVariableVO[]>(),
  requestVariableList: createAction(EstimateContentActionType.requestVariableList)(),
};
