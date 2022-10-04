import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectScheduleShort,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import { ProjectScheduleParameter } from 'project_schedule/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectScheduleAction {
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
  setProjectId:  createAction(ProjectScheduleAction.setProjectId)<ProjectId | undefined>(),
  setOne:        createAction(ProjectScheduleAction.setOne)<ProjectScheduleVO | undefined>(),
  setId:         createAction(ProjectScheduleAction.setId)<number>(),
  setFilter:     createAction(ProjectScheduleAction.setFilter)<ProjectScheduleQuery>(),
  setList:       createAction(ProjectScheduleAction.setList)<ProjectScheduleShort[] | undefined>(),
  addModal:      createAction(ProjectScheduleAction.addModal)<boolean>(),
  add:           createAction(ProjectScheduleAction.add)<ProjectScheduleParameter>(),
  update:        createAction(ProjectScheduleAction.update)<ProjectScheduleParameter>(),
  deleteOne:     createAction(ProjectScheduleAction.deleteOne)<number>(),
  requestAdd:    createAction(ProjectScheduleAction.requestAdd)<ApiStatus>(),
  requestUpdate: createAction(ProjectScheduleAction.requestUpdate)<ApiStatus>(),
  requestDelete: createAction(ProjectScheduleAction.requestDelete)<ApiStatus>(),
};
