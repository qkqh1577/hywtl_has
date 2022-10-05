import { createAction } from 'typesafe-actions';
import { DepartmentQuery } from 'department/query';
import Page from 'type/Page';
import {
  DepartmentShort,
  DepartmentVO
} from 'department/domain';
import { DepartmentParameter } from 'department/parameter';
import { FormikSubmit } from 'type/Form';

export enum DepartmentAction {
  setFilter   = 'department/filter/set',
  setPage     = 'department/page/set',
  setList     = 'department/list/set',
  requestList = 'department/list/request',
  setOne      = 'department/one/set',
  upsert      = 'department/upsert',
}

export const departmentAction = {
  setFilter:   createAction(DepartmentAction.setFilter)<FormikSubmit<DepartmentQuery>>(),
  setPage:     createAction(DepartmentAction.setPage)<Page<DepartmentShort> | undefined>(),
  setList:     createAction(DepartmentAction.setList)<DepartmentShort[]>(),
  requestList: createAction(DepartmentAction.requestList)(),
  setOne:      createAction(DepartmentAction.setOne)<DepartmentVO | undefined>(),
  upsert:      createAction(DepartmentAction.upsert)<FormikSubmit<DepartmentParameter>>(),
};