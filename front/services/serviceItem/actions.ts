import { createAction } from 'typesafe-actions';
import {
  ServiceItemQuery,
  ServiceItemList,
  ServiceItemDetail
} from 'services/serviceItem';

export enum ServiceItemActionType {
  getList = 'serviceItem/getList',
  setList = 'serviceItem/setList',
  getOrderList = 'serviceItem/getOrderList',
  setOrderList = 'serviceItem/setOrderList',
  getOne = 'serviceItem/getOne',
  setOne = 'serviceItem/setOne',
  add = 'serviceItem/add',
  change = 'serviceItem/change',
  delete = 'serviceItem/delete',
}

export const serviceItemActions = {
  getList: createAction(ServiceItemActionType.getList)<ServiceItemQuery>(),
  setList: createAction(ServiceItemActionType.setList)<ServiceItemList[]>(),
  getOne: createAction(ServiceItemActionType.getOne)<number>(),
  setOne: createAction(ServiceItemActionType.setOne)<ServiceItemDetail | undefined>(),
};