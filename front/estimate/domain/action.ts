import { createAction } from 'typesafe-actions';
import {
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'estimate/domain/template';
import { FormikSubmit } from 'user/domain/action';
import { EstimateTemplateQuery } from 'estimate/parameter/query';
import { EstimateTemplateParameter } from 'estimate/parameter/parameter';

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