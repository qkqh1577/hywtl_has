import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'components/Page';
import { CompanyDetail, Company, CompanyList, CompanyActionType } from 'services/company';

export type CompanyState = {
  page: Page<CompanyList>
  list?: Company[]
  detail?: CompanyDetail
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
  }),
  [CompanyActionType.setAll]: (state, action) => ({
    ...state,
    list: action.payload
  })
});

export default companyReducer;
