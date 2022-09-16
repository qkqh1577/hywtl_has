import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import { ProjectScheduleShort } from 'project_schedule/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import { FormikSubmit } from 'type/Form';

export enum ProjectScheduleAction {
  setProjectId     = 'project/sales/schedule/projectId/set',
  setFilter = 'project/sales/schedule/filter/set',
  setList   = 'project/sales/schedule/list/set'
}

export const projectScheduleAction = {
  setProjectId:     createAction(ProjectScheduleAction.setProjectId)<ProjectId | undefined>(),
  setFilter: createAction(ProjectScheduleAction.setFilter)<FormikSubmit<ProjectScheduleQuery>>(),
  setList:   createAction(ProjectScheduleAction.setList)<ProjectScheduleShort[] | undefined>(),
};
