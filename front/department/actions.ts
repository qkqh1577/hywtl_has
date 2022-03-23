import { createAction } from 'typesafe-actions';
import Department from 'department/Department';
import { DepartmentAddParameter } from 'department/DepartmentParameter';

export enum DepartmentActionType {
  getPage = 'department/getPage',
  setPage = 'department/setPage',
  getOne = 'department/getOne',
  setOne = 'department/setOne',
  add = 'department/add'
}

export const departmentActions = {
  getOne: createAction(DepartmentActionType.getOne)<number>(),
  setOne: createAction(DepartmentActionType.setOne)<Department | undefined>(),
  add: createAction(DepartmentActionType.add)<DepartmentAddParameter>(),
};
