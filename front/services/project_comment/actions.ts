import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import {
  ProjectComment,
  ProjectCommentAddParameter,
  ProjectCommentChangeParameter,
  ProjectCommentQuery
} from 'services/project_comment';

export enum ProjectCommentActionType {
  getPage = 'project-comment/getPage',
  setPage = 'project-comment/setPage',
  getOne = 'project-comment/getOne',
  setOne = 'project-comment/setOne',
  add = 'project-comment/add',
  change = 'project-comment/change',
  remove = 'project-comment/delete',
}

export const projectCommentActions = {
  getPage: createAction(ProjectCommentActionType.getPage)<ProjectCommentQuery>(),
  setPage: createAction(ProjectCommentActionType.setPage)<Page<ProjectComment>>(),
  getOne: createAction(ProjectCommentActionType.getOne)<number>(),
  setOne: createAction(ProjectCommentActionType.setOne)<ProjectComment | undefined>(),
  add: createAction(ProjectCommentActionType.add)<{
    params: ProjectCommentAddParameter;
    callback: (data?: ProjectComment) => void;
  }>(),
  change: createAction(ProjectCommentActionType.change)<{
    params: ProjectCommentChangeParameter;
    callback: (data?: ProjectComment) => void;
  }>(),
  remove: createAction(ProjectCommentActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
};
