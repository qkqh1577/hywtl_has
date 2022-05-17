import { createAction } from 'typesafe-actions';;
import Page from 'components/Page';
import {
  Company,
  CompanyAddParameter,
  CompanyChangeParameter,
  CompanyDetail,
  CompanyList,
  CompanyQuery,
  CompanyQueryForModal,
} from 'services/company'

export enum CompanyActionType {
  getPage = 'company/getPage',
  setPage = 'company/setPage',
  getOne = 'company/getOne',
  setOne = 'company/setOne',
  add = 'company/add',
  change = 'company/change',
  getAll = 'company/getAll',
  setAll = 'company/setAll',
}

export const companyActions = {
  getPage: createAction(CompanyActionType.getPage)<CompanyQuery>(),
  setPage: createAction(CompanyActionType.setPage)<Page<CompanyList>>(),
  getOne: createAction(CompanyActionType.getOne)<number>(),
  setOne: createAction(CompanyActionType.setOne)<CompanyDetail | undefined>(),
  getAll: createAction(CompanyActionType.getAll)<CompanyQueryForModal>(),
  setAll: createAction(CompanyActionType.setAll)<Company[]>(),
  add: createAction(CompanyActionType.add)<{
    params: CompanyAddParameter;
    callback: (data?: Company) => void;
  }>(),
  change: createAction(CompanyActionType.change)<{
    params: CompanyChangeParameter;
    callback: (data?: Company) => void;
  }>(),
};
