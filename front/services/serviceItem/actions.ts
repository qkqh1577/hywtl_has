import { createAction } from 'typesafe-actions';
import {
  ServiceItemQuery,
  ServiceItemList,
  ServiceItemDetail,
  ServiceItemParameter,
  ServiceItemOrderList
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
  getOrderList: createAction(ServiceItemActionType.getOrderList)(),
  setOrderList: createAction(ServiceItemActionType.setOrderList)<ServiceItemOrderList[]>(),
  getOne: createAction(ServiceItemActionType.getOne)<number>(),
  setOne: createAction(ServiceItemActionType.setOne)<ServiceItemDetail | undefined>(),
  add: createAction(ServiceItemActionType.add)<{
    params: ServiceItemParameter;
    callback: (data?: ServiceItemDetail) => void;
  }>(),
};