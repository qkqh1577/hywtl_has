import { createAction } from 'typesafe-actions';
import {
  EstimateTemplateId,
  EstimateTemplateShortVO,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import { EstimateTemplateParameter } from 'admin/estimate/template/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum EstimateTemplateActionType {
  setFilter        = 'admin/estimate/template/filter/set',
  setList          = 'admin/estimate/template/list/set',
  setId            = 'admin/estimate/template/id/set',
  setOne           = 'admin/estimate/template/one/set',
  upsert           = 'admin/estimate/template/upsert',
  requestUpsert    = 'admin/estimate/template/upsert/request',
  changeSeq        = 'admin/estimate/template/changeSeq',
  requestChangeSeq = 'admin/estimate/template/changeSeq/request',
  seqModal         = 'admin/estimate/template/seq-modal',
  deleteOne        = 'admin/estimate/template/delete',
  requestDelete    = 'admin/estimate/template/delete/request',
}

export const estimateTemplateAction = {
  setFilter:        createAction(EstimateTemplateActionType.setFilter)<EstimateTemplateQuery>(),
  setList:          createAction(EstimateTemplateActionType.setList)<EstimateTemplateShortVO[]>(),
  setId:            createAction(EstimateTemplateActionType.setId)<EstimateTemplateId | undefined>(),
  setOne:           createAction(EstimateTemplateActionType.setOne)<EstimateTemplateVO | undefined>(),
  upsert:           createAction(EstimateTemplateActionType.upsert)<EstimateTemplateParameter>(),
  requestUpsert:    createAction(EstimateTemplateActionType.requestUpsert)<ApiStatus>(),
  changeSeq:        createAction(EstimateTemplateActionType.changeSeq)<EstimateTemplateId[]>(),
  requestChangeSeq: createAction(EstimateTemplateActionType.requestChangeSeq)<ApiStatus>(),
  seqModal:         createAction(EstimateTemplateActionType.seqModal)<boolean>(),
  deleteOne:        createAction(EstimateTemplateActionType.deleteOne)(),
  requestDelete:    createAction(EstimateTemplateActionType.requestDelete)<ApiStatus>(),
};