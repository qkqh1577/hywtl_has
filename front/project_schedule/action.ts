import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectScheduleShort,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import { ProjectScheduleParameter } from 'project_schedule/parameter';

export enum ProjectScheduleAction {
  setProjectId = 'project/sales/schedule/projectId/set',
  setId        = 'project/sales/schedule/id/set',
  setOne       = 'project/sales/schedule/one/set',
  setFilter    = 'project/sales/schedule/filter/set',
  setList      = 'project/sales/schedule/list/set',
  addModal     = 'project/sales/schedule/addModal',
  add          = 'project/sales/schedule/add',
  update       = 'project/sales/schedule/update',
  delete       = 'project/sales/schedule/delete',
}

export const projectScheduleAction = {
  setProjectId: createAction(ProjectScheduleAction.setProjectId)<ProjectId | undefined>(),
  setOne:       createAction(ProjectScheduleAction.setOne)<ProjectScheduleVO | undefined>(),
  setId:        createAction(ProjectScheduleAction.setId)<number>(),
  setFilter:    createAction(ProjectScheduleAction.setFilter)<ProjectScheduleQuery>(),
  setList:      createAction(ProjectScheduleAction.setList)<ProjectScheduleShort[] | undefined>(),
  addModal:     createAction(ProjectScheduleAction.addModal)<boolean>(),
  add:          createAction(ProjectScheduleAction.add)<ProjectScheduleParameter>(),
  update:       createAction(ProjectScheduleAction.update)<ProjectScheduleParameter>(),
  delete:       createAction(ProjectScheduleAction.delete)<number>(),
};
