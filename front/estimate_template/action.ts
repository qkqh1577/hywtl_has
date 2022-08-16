import { createAction } from 'typesafe-actions';
import {
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'estimate_template/domain';
import { FormikSubmit } from 'user/action';
import { EstimateTemplateQuery } from 'estimate_template/query';
import { EstimateTemplateParameter } from 'estimate_template/parameter';

export enum EstimateTemplateAction {
  setFilter = 'estimate/template/filter/set',
  setList   = 'estimate/template/list/set',
  setOne    = 'estimate/template/one/set',
  upsert    = 'estimate/template/upsert'
}

export const estimateTemplateAction = {
  setFilter: createAction(EstimateTemplateAction.setFilter)<FormikSubmit<EstimateTemplateQuery>>(),
  setList: createAction(EstimateTemplateAction.setList)<EstimateTemplateShort[]>(),
  setOne: createAction(EstimateTemplateAction.setOne)<EstimateTemplateVO>(),
  upsert: createAction(EstimateTemplateAction.upsert)<FormikSubmit<EstimateTemplateParameter>>(),
}