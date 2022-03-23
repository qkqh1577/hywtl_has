import { createAction } from 'typesafe-actions';
import Department from 'department/Department';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter,
  DepartmentQuery
} from 'department/parameter';
import Page from 'common/Page';

export enum DepartmentActionType {
  getPage = 'department/getPage',
  setPage = 'department/setPage',
  getOne = 'department/getOne',
  setOne = 'department/setOne',
  add = 'department/add',
  change = 'department/change',
  changeParent = 'department/changeParent',
  selectOne = 'department/selectOne',
}

export const departmentActions = {
  getPage: createAction(DepartmentActionType.getPage)<DepartmentQuery>(),
  setPage: createAction(DepartmentActionType.setPage)<Page<Department>>(),
  getOne: createAction(DepartmentActionType.getOne)<number>(),
  setOne: createAction(DepartmentActionType.setOne)<Department | undefined>(),
  add: createAction(DepartmentActionType.add)<DepartmentAddParameter>(),
  change: createAction(DepartmentActionType.change)<{ params: DepartmentChangeParameter; callback: (success?: boolean) => void; }>(),
  changeParent: createAction(DepartmentActionType.changeParent)<{ params: { id: number; parentId?: number; }; callback: (success?: boolean) => void; }>(),
  selectOne: createAction(DepartmentActionType.selectOne)<number | undefined>(),
};
