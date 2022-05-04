import { createAction } from 'typesafe-actions';
import {CompanyAddParameter, CompanyQuery} from "./parameters";
import Page from "components/Page";
import CompanyDetail, {Company, CompanyList} from "./entity";

export enum CompanyActionType {
  getPage = 'company/getPage',
  setPage = 'company/setPage',
  getOne = 'company/getOne',
  setOne = 'company/setOne',
  add = 'company/add',
}

export const companyActions = {
  getPage: createAction(CompanyActionType.getPage)<CompanyQuery>(),
  setPage: createAction(CompanyActionType.setPage)<Page<CompanyList>>(),
  getOne: createAction(CompanyActionType.getOne)<number>(),
  setOne: createAction(CompanyActionType.setOne)<CompanyDetail | undefined>(),
  add: createAction(CompanyActionType.add)<{
    params: CompanyAddParameter;
    callback: (data?: Company) => void;
  }>(),
};