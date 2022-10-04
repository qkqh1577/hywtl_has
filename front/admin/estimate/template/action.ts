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
  setFilter     = 'estimate/template/filter/set',
  setList       = 'estimate/template/list/set',
  setId         = 'estimate/template/id/set',
  setOne        = 'estimate/template/one/set',
  upsert        = 'estimate/template/upsert',
  requestUpsert = 'estimate/template/upsert/request',
  changeSeq     = 'estimate/template/changeSeq',
  seqModal      = 'estimate/template/seq-modal',
  deleteOne     = 'estimate/template/delete',
  requestDelete = 'estimate/template/delete/request',

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