import {ServiceItemDetail, ServiceItemList} from "./entity";
import { createReducer } from "typesafe-actions";
import { ServiceItemActionType } from "./actions";

export type ServiceItemState = {
  list?: ServiceItemList[]
  detail?: ServiceItemDetail
}

export const initState: ServiceItemState = {
  list: []
};

const serviceItemReducer = createReducer(initState, {
  [ServiceItemActionType.setList]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [ServiceItemActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload
  }),
});

export default serviceItemReducer;