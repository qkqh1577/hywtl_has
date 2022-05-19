import { createAction } from 'typesafe-actions';;
import Page from 'components/Page';
import {
  Business,
  BusinessAddParameter,
  BusinessChangeParameter,
  BusinessDetail,
  BusinessList,
  BusinessQuery,
  BusinessQueryForModal,
} from 'services/business'

export enum BusinessActionType {
  getPage = 'business/getPage',
  setPage = 'business/setPage',
  getOne = 'business/getOne',
  setOne = 'business/setOne',
  add = 'business/add',
  change = 'business/change',
  getAll = 'business/getAll',
  setAll = 'business/setAll',
}

export const businessActions = {
  getPage: createAction(BusinessActionType.getPage)<BusinessQuery>(),
  setPage: createAction(BusinessActionType.setPage)<Page<BusinessList>>(),
  getOne: createAction(BusinessActionType.getOne)<number>(),
  setOne: createAction(BusinessActionType.setOne)<BusinessDetail | undefined>(),
  getAll: createAction(BusinessActionType.getAll)<BusinessQueryForModal>(),
  setAll: createAction(BusinessActionType.setAll)<Business[]>(),
  add: createAction(BusinessActionType.add)<{
    params: BusinessAddParameter;
    callback: (data?: Business) => void;
  }>(),
  change: createAction(BusinessActionType.change)<{
    params: BusinessChangeParameter;
    callback: (data?: Business) => void;
  }>(),
};
