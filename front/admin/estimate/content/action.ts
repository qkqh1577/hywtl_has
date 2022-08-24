import { createAction } from 'typesafe-actions';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import { FormikSubmit } from 'type/Form';
import {
  EstimateContentId,
  EstimateContentShort,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';

export enum EstimateContentAction {
  setFilter = 'admin/estimate/content/filter/set',
  setList   = 'admin/estimate/content/list/set',
  setOne    = 'admin/estimate/content/one/set',
  upsert    = 'admin/estimate/content/upsert',
  changeSeq = 'admin/estimate/content/changeSeq'
}

export const estimateContentAction = {
  setFilter: createAction(EstimateContentAction.setFilter)<FormikSubmit<EstimateContentQuery>>(),
  setList:   createAction(EstimateContentAction.setList)<EstimateContentShort[]>(),
  setOne:    createAction(EstimateContentAction.setOne)<EstimateContentVO>(),
  upsert:    createAction(EstimateContentAction.upsert)<FormikSubmit<EstimateContentParameter>>(),
  changeSeq: createAction(EstimateContentAction.changeSeq)<EstimateContentId[]>(),
};
