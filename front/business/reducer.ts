import { BusinessQuery, RegistrationNumberQuery } from "./query";
import { BusinessShort, BusinessVO, InvolvedProjectVO, RivalProjectVO } from "./domain";
import Page from "type/Page";
import { createReducer } from "typesafe-actions";
import {BusinessAction} from "./action";

export interface BusinessState {
  filter?: BusinessQuery;
  check?: RegistrationNumberQuery;
  page?: Page<BusinessShort>
  list?: BusinessShort[];
  detail?: BusinessVO;
  InvolvedProjectList?: InvolvedProjectVO[];
  RivalProjectList?: RivalProjectVO[];
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
