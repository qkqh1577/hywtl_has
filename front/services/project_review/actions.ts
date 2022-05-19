import { createAction } from 'typesafe-actions';
import {
  ListProjectReview,
  ProjectReview,
  ProjectReviewParameter
} from 'services/project_review';

export enum ProjectReviewActionType {
  getList = 'project/review/getList',
  setList = 'project/review/setList',
  getOne = 'project/review/getOne',
  setOne = 'project/review/setOne',
  add = 'project/review/add',
  update = 'project/review/update',
  remove = 'project/review/remove',
  setId = 'project/review/setId',
}

export const projectReviewActions = {
  getList: createAction(ProjectReviewActionType.getList)<number>(),
  setList: createAction(ProjectReviewActionType.setList)<ListProjectReview[] | undefined>(),
  getOne: createAction(ProjectReviewActionType.getOne)<number>(),
  setOne: createAction(ProjectReviewActionType.setOne)<ProjectReview | undefined>(),
  add: createAction(ProjectReviewActionType.add)<{
    projectId: number;
    params: ProjectReviewParameter;
    callback: () => void;
  }>(),
  update: createAction(ProjectReviewActionType.update)<{
    id: number;
    params: ProjectReviewParameter;
    callback: () => void;
  }>(),
  remove: createAction(ProjectReviewActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
  setId: createAction(ProjectReviewActionType.setId)<number | null | undefined>(),
};
