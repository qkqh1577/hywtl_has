import { createAction } from 'typesafe-actions';
import { DepartmentQuery } from 'department/query';
import Page from 'type/Page';
import {
  DepartmentId,
  DepartmentShortVO,
  DepartmentVO
} from 'department/domain';
import { DepartmentParameter } from 'department/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum DepartmentActionType {
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
  setFilter:     createAction(DepartmentActionType.setFilter)<DepartmentQuery>(),
  setPage:       createAction(DepartmentActionType.setPage)<Page<DepartmentShortVO> | undefined>(),
  setList:       createAction(DepartmentActionType.setList)<DepartmentShortVO[]>(),
  requestList:   createAction(DepartmentActionType.requestList)(),
  setId:         createAction(DepartmentActionType.setId)<DepartmentId | undefined>(),
  setOne:        createAction(DepartmentActionType.setOne)<DepartmentVO | undefined>(),
  upsert:        createAction(DepartmentActionType.upsert)<DepartmentParameter>(),
  requestUpsert: createAction(DepartmentActionType.requestUpsert)<ApiStatus>(),
  deleteOne:     createAction(DepartmentActionType.deleteOne)<DepartmentId>(),
  requestDelete: createAction(DepartmentActionType.requestDelete)<ApiStatus>(),
};