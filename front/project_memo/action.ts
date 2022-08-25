import { createAction } from 'typesafe-actions';
import { FormikSubmit } from 'type/Form';
import {
  ProjectMemoParameter,
  ProjectMemoQuery
} from 'project_memo/parameter';
import Page from 'type/Page';
import { ProjectMemoVO } from 'project_memo/domain';

export enum ProjectMemoAction {
  setDrawer    = 'project/memo/drawer/set',
  setProjectId = 'project/memo/projectId/set',
  setFilter    = 'project/memo/filter/set',
  setPage      = 'project/memo/page/set',
  add          = 'project/memo/add'
}

export const projectMemoAction = {
  setDrawer:    createAction(ProjectMemoAction.setDrawer)<boolean>(),
  setProjectId: createAction(ProjectMemoAction.setProjectId)<number | undefined>(),
  setFilter:    createAction(ProjectMemoAction.setFilter)<FormikSubmit<ProjectMemoQuery>>(),
  setPage:      createAction(ProjectMemoAction.setPage)<Page<ProjectMemoVO>>(),
  add:          createAction(ProjectMemoAction.add)<FormikSubmit<ProjectMemoParameter>>(),
};