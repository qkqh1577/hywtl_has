import Company, {ListCompany} from "./entity";
import Page, { initial } from 'components/Page';
import {createReducer} from "typesafe-actions";
import {CompanyActionType} from "./actions";

export type CompanyState = {
  page: Page<ListCompany>
  detail?: Company;
};

export const initState: CompanyState = {
  page: initial
};

const companyReducer = createReducer(initState, {
  [CompanyActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload
  }),
  [CompanyActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload
  })
})

export default companyReducer;