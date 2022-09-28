import { createAction } from 'typesafe-actions';
import {
  EstimateTemplateId,
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import { EstimateTemplateParameter } from 'admin/estimate/template/parameter';
import { FormikSubmit } from 'type/Form';

export enum EstimateTemplateAction {
  setFilter = 'estimate/template/filter/set',
  setList   = 'estimate/template/list/set',
  setOne    = 'estimate/template/one/set',
  upsert    = 'estimate/template/upsert',
  changeSeq = 'estimate/template/changeSeq'
}

export const estimateTemplateAction = {
  setFilter: createAction(EstimateTemplateAction.setFilter)<FormikSubmit<EstimateTemplateQuery>>(),
  setList:   createAction(EstimateTemplateAction.setList)<EstimateTemplateShort[]>(),
  setOne:    createAction(EstimateTemplateAction.setOne)<EstimateTemplateVO>(),
  upsert:    createAction(EstimateTemplateAction.upsert)<FormikSubmit<EstimateTemplateParameter>>(),
  changeSeq: createAction(EstimateTemplateAction.changeSeq)<EstimateTemplateId[]>(),
};