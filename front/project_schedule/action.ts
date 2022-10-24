import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectScheduleId,
  ProjectScheduleShortVO,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import { ProjectScheduleParameter } from 'project_schedule/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectScheduleActionType {
  setProjectId  = 'project/sales/schedule/projectId/set',
  setId         = 'project/sales/schedule/id/set',
  setOne        = 'project/sales/schedule/one/set',
  setFilter     = 'project/sales/schedule/filter/set',
  setList       = 'project/sales/schedule/list/set',
  addModal      = 'project/sales/schedule/addModal',
  add           = 'project/sales/schedule/add',
  requestAdd    = 'project/sales/schedule/add/request',
  update        = 'project/sales/schedule/update',
  requestUpdate = 'project/sales/schedule/update/request',
  deleteOne     = 'project/sales/schedule/delete',
  requestDelete = 'project/sales/schedule/delete/request',
}

export const projectScheduleAction = {
  setProjectId:  createAction(ProjectScheduleActionType.setProjectId)<ProjectId | undefined>(),
  setOne:        createAction(ProjectScheduleActionType.setOne)<ProjectScheduleVO | undefined>(),
  setId:         createAction(ProjectScheduleActionType.setId)<ProjectScheduleId | undefined>(),
  setFilter:     createAction(ProjectScheduleActionType.setFilter)<ProjectScheduleQuery>(),
  setList:       createAction(ProjectScheduleActionType.setList)<ProjectScheduleShortVO[] | undefined>(),
  addModal:      createAction(ProjectScheduleActionType.addModal)<boolean>(),
  add:           createAction(ProjectScheduleActionType.add)<ProjectScheduleParameter>(),
  update:        createAction(ProjectScheduleActionType.update)<ProjectScheduleParameter>(),
  deleteOne:     createAction(ProjectScheduleActionType.deleteOne)<number>(),
  requestAdd:    createAction(ProjectScheduleActionType.requestAdd)<ApiStatus>(),
  requestUpdate: createAction(ProjectScheduleActionType.requestUpdate)<ApiStatus>(),
  requestDelete: createAction(ProjectScheduleActionType.requestDelete)<ApiStatus>(),
};
