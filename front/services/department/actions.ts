import { createAction } from 'typesafe-actions';
import Department, { ListDepartment } from './Department';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter,
  DepartmentQuery
} from './parameter';
import Page from 'common/Page';

export enum DepartmentActionType {
  getAll = 'department/getAll',
  setAll = 'department/setAll',
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
  getAll: createAction(DepartmentActionType.getAll)(),
  setAll: createAction(DepartmentActionType.setAll)<Department[]>(),
  getPage: createAction(DepartmentActionType.getPage)<DepartmentQuery>(),
  setPage: createAction(DepartmentActionType.setPage)<Page<ListDepartment>>(),
  getOne: createAction(DepartmentActionType.getOne)<number>(),
  setOne: createAction(DepartmentActionType.setOne)<Department | undefined>(),
  add: createAction(DepartmentActionType.add)<DepartmentAddParameter>(),
  change: createAction(DepartmentActionType.change)<{ params: DepartmentChangeParameter; callback: (success?: boolean) => void; }>(),
  changeParent: createAction(DepartmentActionType.changeParent)<{ params: { id: number; parentId?: number; }; callback: (success?: boolean) => void; }>(),
  selectOne: createAction(DepartmentActionType.selectOne)<number | undefined>(),
};
