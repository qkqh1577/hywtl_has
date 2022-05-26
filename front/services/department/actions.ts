import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import {
  Department,
  DepartmentChangeTreeParameter,
  DepartmentParameter,
  DepartmentQuery,
  DepartmentShort,
} from 'services/department';

export enum DepartmentActionType {
  getAll = 'department/getAll',
  setAll = 'department/setAll',
  getPage = 'department/getPage',
  setPage = 'department/setPage',
  getOne = 'department/getOne',
  setOne = 'department/setOne',
  upsert = 'department/upsert',
  changeTree = 'department/changeTree',
}

export const departmentActions = {
  getAll: createAction(DepartmentActionType.getAll)<string | undefined>(),
  setAll: createAction(DepartmentActionType.setAll)<DepartmentShort[]>(),
  getPage: createAction(DepartmentActionType.getPage)<DepartmentQuery>(),
  setPage: createAction(DepartmentActionType.setPage)<Page<DepartmentShort>>(),
  getOne: createAction(DepartmentActionType.getOne)<number>(),
  setOne: createAction(DepartmentActionType.setOne)<Department | undefined>(),
  upsert: createAction(DepartmentActionType.upsert)<{
    params: DepartmentParameter;
    callback: (data?: Department) => void;
  }>(),
  changeTree: createAction(DepartmentActionType.changeTree)<{
    params: DepartmentChangeTreeParameter;
    callback: (list?: DepartmentShort[]) => void;
  }>(),
};
