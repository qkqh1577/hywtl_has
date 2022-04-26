import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import ProjectComment from 'services/project_comment/entity';
import {
  ProjectCommentAddParameter,
  ProjectCommentQuery
} from 'services/project_comment/parameter';

export enum ProjectCommentActionType {
  getPage = 'project-comment/getPage',
  setPage = 'project-comment/setPage',
  getOne = 'project-comment/getOne',
  setOne = 'project-comment/setOne',
  add = 'project-comment/add',
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
};
