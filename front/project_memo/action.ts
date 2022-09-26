import { createAction } from 'typesafe-actions';
import {
  ProjectMemoAddParameter,
  ProjectMemoChangeParameter,
  ProjectMemoQuery
} from 'project_memo/parameter';
import Page from 'type/Page';
import {
  ProjectMemoId,
  ProjectMemoVO
} from 'project_memo/domain';
import { ProjectId } from 'project/domain';

export enum ProjectMemoAction {
  setDrawer     = 'project/memo/drawer/set',
  setProjectId  = 'project/memo/projectId/set',
  setFilter     = 'project/memo/filter/set',
  setPage       = 'project/memo/page/set',
  add           = 'project/memo/add',
  requestAdd    = 'project/memo/add/request',
  requestChange = 'project/memo/change/request',
  change        = 'project/memo/change',
  deleteOne     = 'project/memo/delete',
  requestDelete = 'project/memo/delete/request'
}

export const projectMemoAction = {
  setDrawer:     createAction(ProjectMemoAction.setDrawer)<boolean>(),
  setProjectId:  createAction(ProjectMemoAction.setProjectId)<ProjectId | undefined>(),
  setFilter:     createAction(ProjectMemoAction.setFilter)<ProjectMemoQuery>(),
  setPage:       createAction(ProjectMemoAction.setPage)<Page<ProjectMemoVO>>(),
  add:           createAction(ProjectMemoAction.add)<ProjectMemoAddParameter>(),
  requestAdd:    createAction(ProjectMemoAction.requestAdd)<string>(),
  change:        createAction(ProjectMemoAction.change)<ProjectMemoChangeParameter>(),
  requestChange: createAction(ProjectMemoAction.requestChange)<string>(),
  deleteOne:     createAction(ProjectMemoAction.deleteOne)<ProjectMemoId>(),
  requestDelete: createAction(ProjectMemoAction.requestDelete)<string>(),
};