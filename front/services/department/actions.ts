import { createAction } from 'typesafe-actions';
import Department, { ListDepartment } from 'services/department/entity';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter, DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';
import Page from 'components/Page';

export enum DepartmentActionType {
  getAll = 'department/getAll',
  setAll = 'department/setAll',
  getPage = 'department/getPage',
  setPage = 'department/setPage',
  getOne = 'department/getOne',
  setOne = 'department/setOne',
  add = 'department/add',
  change = 'department/change',
  changeTree = 'department/changeTree',
}

export const departmentActions = {
  getAll: createAction(DepartmentActionType.getAll)(),
  setAll: createAction(DepartmentActionType.setAll)<ListDepartment[]>(),
  getPage: createAction(DepartmentActionType.getPage)<DepartmentQuery>(),
  setPage: createAction(DepartmentActionType.setPage)<Page<ListDepartment>>(),
  getOne: createAction(DepartmentActionType.getOne)<number>(),
  setOne: createAction(DepartmentActionType.setOne)<Department | undefined>(),
  add: createAction(DepartmentActionType.add)<{
    params: DepartmentAddParameter;
    callback: (data?: Department) => void;
  }>(),
  change: createAction(DepartmentActionType.change)<{
    params: DepartmentChangeParameter;
    callback: (data?: Department) => void;
  }>(),
  changeTree: createAction(DepartmentActionType.changeTree)<{
    params: DepartmentChangeTreeParameter;
    callback: (list?: ListDepartment[]) => void;
  }>(),
};
