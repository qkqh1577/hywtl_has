import { createAction } from 'typesafe-actions';
import {
  ListProjectTargetReview,
  ProjectTargetDocument,
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetReview,
  ProjectTargetReviewParameter,
} from 'services/project_target';

export enum ProjectTargetActionType {
  getReviewList = 'project/target/review/getList',
  setReviewList = 'project/target/review/setList',
  getReview = 'project/target/review/getOne',
  setReview = 'project/target/review/setOne',
  addReview = 'project/target/review/add',
  updateReview = 'project/target/review/update',
  removeReview = 'project/target/review/remove',
  confirmReview = 'project/target/review/confirm',
  setReviewId = 'project/target/review/setId',

  getDocumentList = 'project/target/document/getList',
  setDocumentList = 'project/target/document/setList',
  getDocument = 'project/target/document/getOne',
  setDocument = 'project/target/document/setOne',
  addDocument = 'project/target/document/add',
  updateDocument = 'project/target/document/update',
  removeDocument = 'project/target/document/remove',
  setDocumentId = 'project/target/document/setId',
}

export const projectTargetActions = {
  getReviewList: createAction(ProjectTargetActionType.getReviewList)<number>(),
  setReviewList: createAction(ProjectTargetActionType.setReviewList)<ListProjectTargetReview[] | undefined>(),
  getReview: createAction(ProjectTargetActionType.getReview)<number>(),
  setReview: createAction(ProjectTargetActionType.setReview)<ProjectTargetReview | undefined>(),
  addReview: createAction(ProjectTargetActionType.addReview)<{
    projectId: number;
    params: ProjectTargetReviewParameter;
    callback: () => void;
  }>(),
  updateReview: createAction(ProjectTargetActionType.updateReview)<{
    id: number;
    params: ProjectTargetReviewParameter;
    callback: () => void;
  }>(),
  removeReview: createAction(ProjectTargetActionType.removeReview)<{
    id: number;
    callback: () => void;
  }>(),
  confirmReview: createAction(ProjectTargetActionType.confirmReview)<{
    id: number;
    callback: () => void;
  }>(),
  setReviewId: createAction(ProjectTargetActionType.setReviewId)<number | null | undefined>(),

  getDocumentList: createAction(ProjectTargetActionType.getDocumentList)<number>(),
  setDocumentList: createAction(ProjectTargetActionType.setDocumentList)<ProjectTargetDocument[] | undefined>(),
  getDocument: createAction(ProjectTargetActionType.getDocument)<number>(),
  setDocument: createAction(ProjectTargetActionType.setDocument)<ProjectTargetDocument | undefined>(),
  addDocument: createAction(ProjectTargetActionType.addDocument)<{
    projectId: number;
    params: ProjectTargetDocumentAddParameter;
    callback: () => void;
  }>(),
  updateDocument: createAction(ProjectTargetActionType.updateDocument)<{
    id: number;
    params: ProjectTargetDocumentChangeParameter;
    callback: () => void;
  }>(),
  removeDocument: createAction(ProjectTargetActionType.removeDocument)<{
    id: number;
    callback: () => void;
  }>(),
  setDocumentId: createAction(ProjectTargetActionType.setDocumentId)<number | null | undefined>(),
};