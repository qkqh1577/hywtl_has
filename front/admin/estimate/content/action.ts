import { createAction } from 'typesafe-actions';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import { FormikSubmit } from 'type/Form';
import {
  EstimateContentShort,
  EstimateContentVO
} from 'admin/estimate/content/domain';

export enum EstimateContentAction {
  setFilter = 'admin/estimate/content/filter/set',
  setList   = 'admin/estimate/content/list/set',
  setOne    = 'admin/estimate/content/one/set',
}

export const estimateContentAction = {
  setFilter: createAction(EstimateContentAction.setFilter)<FormikSubmit<EstimateContentQuery>>(),
  setList: createAction(EstimateContentAction.setList)<EstimateContentShort[]>(),
  setOne: createAction(EstimateContentAction.setOne)<EstimateContentVO>(),

}
