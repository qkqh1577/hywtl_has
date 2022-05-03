import { createAction } from 'typesafe-actions';
import { CompanyQuery } from "./parameters";
import Page from "components/Page";
import Company, { ListCompany } from "./entity";

export enum CompanyActionType {
  getPage = 'company/getPage',
  setPage = 'company/setPage',
  getOne = 'company/getOne',
  setOne = 'company/setOne',
}

export const companyActions = {
  getPage: createAction(CompanyActionType.getPage)<CompanyQuery>(),
  setPage: createAction(CompanyActionType.setPage)<Page<ListCompany>>(),
  getOne: createAction(CompanyActionType.getOne)<number>(),
  setOne: createAction(CompanyActionType.setOne)<Company | undefined>(),
};