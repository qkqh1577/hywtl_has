import { BusinessQuery, RegistrationNumberQuery } from "business/query";
import { BusinessShort, BusinessVO, InvolvedProjectVO, RivalProjectVO } from "business/domain";
import Page from "type/Page";
import { createReducer } from "typesafe-actions";
import {BusinessAction} from "business/action";

export interface BusinessState {
  filter?: BusinessQuery;
  check?: RegistrationNumberQuery;
  page?: Page<BusinessShort>
  list?: BusinessShort[];
  detail?: BusinessVO;
  involvedProjectList?: InvolvedProjectVO[];
  rivalProjectList?: RivalProjectVO[];
}

const initialState: BusinessState = {};

export const businessReducer = createReducer(initialState, {
  [BusinessAction.setFilter]:(state, action) => ({...state, filter: action.payload.values}),

  [BusinessAction.setRegistrationNumber]:(state, action) => ({...state, filter: action.payload.values}),

  [BusinessAction.setPage]:(state, action) => ({...state, page: action.payload}),

  [BusinessAction.setList]:(state, action) => ({...state, list: action.payload}),

  [BusinessAction.setInvolvedProjectList]:(state, action) => ({...state, list: action.payload}),

  [BusinessAction.setRivalProjectList]:(state, action) => ({...state, list: action.payload}),

  [BusinessAction.setOne]:(state, action) => ({...state, detail: action.payload}),
})
