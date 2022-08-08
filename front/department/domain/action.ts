import { createAction } from 'typesafe-actions';
import { DepartmentQuery } from 'department/parameter/query';
import Page from 'services/common/domain/Page';
import {
  DepartmentId,
  DepartmentVO
} from 'department/domain/department';
import { DepartmentParameter } from 'department/parameter/parameter';

export enum DepartmentAction {
  setFilter = 'department/setFilter',
  getPage   = 'department/getPage',
  setPage   = 'department/setPage',
  getList   = 'department/getList',
  setList   = 'department/setList',
  getOne    = 'department/getOne',
  setOne    = 'department/setOne',
  upsert    = 'department/upsert',
}

export const departmentAction = {
  setFilter: createAction(DepartmentAction.setFilter)<DepartmentQuery>(),
  getPage:   createAction(DepartmentAction.getPage)<DepartmentQuery>(),
  setPage:   createAction(DepartmentAction.setPage)<Page<DepartmentVO>>(),
  getList:   createAction(DepartmentAction.getList)(),
  setList:   createAction(DepartmentAction.setList)<DepartmentVO[]>(),
  getOne:    createAction(DepartmentAction.getOne)<DepartmentId>(),
  setOne:    createAction(DepartmentAction.setOne)<DepartmentVO | undefined>(),
  upsert:    createAction(DepartmentAction.upsert)<DepartmentParameter>(),
};