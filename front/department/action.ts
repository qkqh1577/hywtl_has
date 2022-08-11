import { createAction } from 'typesafe-actions';
import { DepartmentQuery } from 'department/query';
import Page from 'type/Page';
import {
  DepartmentShort,
  DepartmentVO
} from 'department/domain';
import { DepartmentParameter } from 'department/parameter';
import { FormikSubmit } from 'user/action';

export enum DepartmentAction {
  setFilter = 'department/filter/set',
  setPage   = 'department/page/set',
  setList   = 'department/list/set',
  setOne    = 'department/one/set',
  upsert    = 'department/upsert',
}

export const departmentAction = {
  setFilter: createAction(DepartmentAction.setFilter)<FormikSubmit<DepartmentQuery>>(),
  setPage:   createAction(DepartmentAction.setPage)<Page<DepartmentShort>| undefined>(),
  setList:   createAction(DepartmentAction.setList)<DepartmentShort[]>(),
  setOne:    createAction(DepartmentAction.setOne)<DepartmentVO | undefined>(),
  upsert:    createAction(DepartmentAction.upsert)<FormikSubmit<DepartmentParameter>>(),
};