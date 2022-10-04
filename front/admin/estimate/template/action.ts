import { createAction } from 'typesafe-actions';
import {
  EstimateTemplateId,
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import { EstimateTemplateParameter } from 'admin/estimate/template/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum EstimateTemplateAction {
  setFilter     = 'admin/estimate/template/filter/set',
  setList       = 'admin/estimate/template/list/set',
  setId         = 'admin/estimate/template/id/set',
  setOne        = 'admin/estimate/template/one/set',
  upsert        = 'admin/estimate/template/upsert',
  requestUpsert = 'admin/estimate/template/upsert/request',
  changeSeq     = 'admin/estimate/template/changeSeq',
  seqModal      = 'admin/estimate/template/seq-modal',
  deleteOne     = 'admin/estimate/template/delete',
  requestDelete = 'admin/estimate/template/delete/request',
}

export const estimateTemplateAction = {
  setFilter:     createAction(EstimateTemplateAction.setFilter)<EstimateTemplateQuery>(),
  setList:       createAction(EstimateTemplateAction.setList)<EstimateTemplateShort[]>(),
  setId:         createAction(EstimateTemplateAction.setId)<EstimateTemplateId | undefined>(),
  setOne:        createAction(EstimateTemplateAction.setOne)<EstimateTemplateVO | undefined>(),
  upsert:        createAction(EstimateTemplateAction.upsert)<EstimateTemplateParameter>(),
  requestUpsert: createAction(EstimateTemplateAction.requestUpsert)<ApiStatus>(),
  changeSeq:     createAction(EstimateTemplateAction.changeSeq)<EstimateTemplateId[]>(),
  seqModal:      createAction(EstimateTemplateAction.seqModal)<boolean>(),
  deleteOne:     createAction(EstimateTemplateAction.deleteOne)(),
  requestDelete: createAction(EstimateTemplateAction.requestDelete)<ApiStatus>(),
};