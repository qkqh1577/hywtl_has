import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import Project, {
  ListProject,
  ProjectBasic,
  ProjectOrder,
  ProjectTarget, ProjectTargetDocument, ProjectTargetReview, ProjectTargetReviewDetail
} from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery,
  ProjectTargetDocumentAddParameter, ProjectTargetDocumentChangeParameter,
  ProjectTargetParameter,
  ProjectTargetReviewAddParameter
} from 'services/project/parameter';

export enum ProjectActionType {
  getPage = 'project/getPage',
  setPage = 'project/setPage',
  getOne = 'project/getOne',
  setOne = 'project/setOne',
  add = 'project/add',
  setAddModal = 'project/setAddModal',

  getBasic = 'project/basic/getOne',
  setBasic = 'project/basic/setOne',
  updateBasic = 'project/basic/update',

  getOrder = 'project/order/getOne',
  setOrder = 'project/order/setOne',
  updateOrder = 'project/order/update',

  getTarget = 'project/target/getOne',
  setTarget = 'project/target/setOne',
  updateTarget = 'project/target/update',

  getTargetReviewList = 'project/target/review/getList',
  setTargetReviewList = 'project/target/review/setList',
  addTargetReview = 'project/target/review/add',
  confirmTargetReview = 'project/target/review/confirm',
  getTargetReviewDetail = 'project/target/review/getDetail',
  setTargetReviewDetail = 'project/target/review/setDetail',
  setTargetReviewDetailModal = 'project/target/review/setModal',

  getTargetDocumentList = 'project/target/document/getList',
  setTargetDocumentList = 'project/target/document/setList',
  addTargetDocument = 'project/target/document/add',
  updateTargetDocument = 'project/target/document/update',
}

export const projectActions = {
  getPage: createAction(ProjectActionType.getPage)<ProjectQuery>(),
  setPage: createAction(ProjectActionType.setPage)<Page<ListProject>>(),
  getOne: createAction(ProjectActionType.getOne)<number>(),
  setOne: createAction(ProjectActionType.setOne)<Project | undefined>(),
  add: createAction(ProjectActionType.add)<{
    params: ProjectBasicParameter;
    callback: (data?: Project) => void;
  }>(),
  setAddModal: createAction(ProjectActionType.setAddModal)<boolean>(),

  getBasic: createAction(ProjectActionType.getBasic)<number>(),
  setBasic: createAction(ProjectActionType.setBasic)<ProjectBasic | undefined>(),
  updateBasic: createAction(ProjectActionType.updateBasic)<{
    projectId: number;
    params: ProjectBasicParameter;
    callback: (data?: ProjectBasic) => void;
  }>(),

  getOrder: createAction(ProjectActionType.getOrder)<number>(),
  setOrder: createAction(ProjectActionType.setOrder)<ProjectOrder | undefined>(),
  updateOrder: createAction(ProjectActionType.updateOrder)<{
    projectId: number;
    params: ProjectOrderParameter;
    callback: (data?: ProjectOrder) => void;
  }>(),

  getTarget: createAction(ProjectActionType.getTarget)<number>(),
  setTarget: createAction(ProjectActionType.setTarget)<ProjectTarget | undefined>(),
  updateTarget: createAction(ProjectActionType.updateTarget)<{
    projectId: number;
    params: ProjectTargetParameter;
    callback: (data?: ProjectTarget) => void;
  }>(),

  getTargetReviewList: createAction(ProjectActionType.getTargetReviewList)<number>(),
  setTargetReviewList: createAction(ProjectActionType.setTargetReviewList)<ProjectTargetReview[] | undefined>(),
  addTargetReview: createAction(ProjectActionType.addTargetReview)<{
    projectId: number;
    params: ProjectTargetReviewAddParameter;
    callback: (list?: ProjectTargetReview[]) => void;
  }>(),
  confirmTargetReview: createAction(ProjectActionType.confirmTargetReview)<{
    id: number;
    callback: (list?: ProjectTargetReview[]) => void;
  }>(),
  setTargetReviewDetailModal: createAction(ProjectActionType.setTargetReviewDetailModal)<number | null | undefined>(),
  getTargetReviewDetail: createAction(ProjectActionType.getTargetReviewDetail)<number>(),

  getTargetDocumentList: createAction(ProjectActionType.getTargetDocumentList)<number>(),
  setTargetDocumentList: createAction(ProjectActionType.setTargetDocumentList)<ProjectTargetDocument[] | undefined>(),
  addTargetDocument: createAction(ProjectActionType.addTargetDocument)<{
    projectId: number;
    params: ProjectTargetDocumentAddParameter;
    callback: (list?: ProjectTargetDocument[]) => void;
  }>(),
  updateTargetDocument: createAction(ProjectActionType.updateTargetDocument)<{
    id: number;
    params: ProjectTargetDocumentChangeParameter;
    callback: (list?: ProjectTargetDocument[]) => void;
  }>(),
};
