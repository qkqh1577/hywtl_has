import { createAction } from 'typesafe-actions';
import { DepartmentQuery } from 'department/query';
import Page from 'type/Page';
import {
  DepartmentId,
  DepartmentShort,
  DepartmentVO
} from 'department/domain';
import { DepartmentParameter } from 'department/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum DepartmentAction {
  setFilter     = 'department/filter/set',
  setPage       = 'department/page/set',
  setList       = 'department/list/set',
  requestList   = 'department/list/request',
  setId         = 'department/id/set',
  setOne        = 'department/one/set',
  upsert        = 'department/upsert',
  requestUpsert = 'department/upsert/request',
  deleteOne     = 'department/delete',
  requestDelete = 'department/delete/request',
}

export const departmentAction = {
  setFilter:     createAction(DepartmentAction.setFilter)<DepartmentQuery>(),
  setPage:       createAction(DepartmentAction.setPage)<Page<DepartmentShort> | undefined>(),
  setList:       createAction(DepartmentAction.setList)<DepartmentShort[]>(),
  requestList:   createAction(DepartmentAction.requestList)(),
  setId:         createAction(DepartmentAction.setId)<DepartmentId | undefined>(),
  setOne:        createAction(DepartmentAction.setOne)<DepartmentVO | undefined>(),
  upsert:        createAction(DepartmentAction.upsert)<DepartmentParameter>(),
  requestUpsert: createAction(DepartmentAction.requestUpsert)<ApiStatus>(),
  deleteOne:     createAction(DepartmentAction.deleteOne)<DepartmentId>(),
  requestDelete: createAction(DepartmentAction.requestDelete)<ApiStatus>(),
};