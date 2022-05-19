import {ServiceItemDetail, ServiceItemList, ServiceItemOrderList} from "./entity";
import { createReducer } from "typesafe-actions";
import { ServiceItemActionType } from "./actions";

export type ServiceItemState = {
  list?: ServiceItemList[]
  detail?: ServiceItemDetail
  orderList?: ServiceItemOrderList[]
}

export const initState: ServiceItemState = {
  list: []
};

const serviceItemReducer = createReducer(initState, {
  [ServiceItemActionType.setList]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [ServiceItemActionType.setOrderList]: (state, action) => ({
    ...state,
    orderList: action.payload
  }),
  [ServiceItemActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload
  }),
});

export default serviceItemReducer;