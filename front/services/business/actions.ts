import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import {
  Business,
  BusinessAddParameter,
  BusinessChangeParameter,
  BusinessQuery,
  BusinessQueryForModal,
  BusinessRegistrationNumberCheckParameter,
  BusinessShort,
} from 'services/business';

export enum BusinessActionType {
  getPage = 'business/getPage',
  setPage = 'business/setPage',
  getOne = 'business/getOne',
  setOne = 'business/setOne',
  add = 'business/add',
  change = 'business/change',
  getAll = 'business/getAll',
  setAll = 'business/setAll',
  remove = 'business/delete',
  checkRegistrationNumber = 'business/registration-number/check',
}

export const businessActions = {
  getPage: createAction(BusinessActionType.getPage)<BusinessQuery>(),
  setPage: createAction(BusinessActionType.setPage)<Page<BusinessShort>>(),
  getOne: createAction(BusinessActionType.getOne)<number>(),
  setOne: createAction(BusinessActionType.setOne)<Business | undefined>(),
  getAll: createAction(BusinessActionType.getAll)<BusinessQueryForModal>(),
  setAll: createAction(BusinessActionType.setAll)<Business[]>(),
  add: createAction(BusinessActionType.add)<{
    params: BusinessAddParameter;
    callback: () => void;
  }>(),
  change: createAction(BusinessActionType.change)<{
    params: BusinessChangeParameter;
    callback: () => void;
  }>(),
  remove: createAction(BusinessActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
  checkRegistrationNumber: createAction(BusinessActionType.checkRegistrationNumber)<{
    params: BusinessRegistrationNumberCheckParameter;
    callback: (e?: any) => void;
  }>(),
};
