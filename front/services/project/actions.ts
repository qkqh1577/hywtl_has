import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import Project, {
  ListProject,
  ListProjectTargetReview,
  ProjectBasic,
  ProjectOrder,
  ProjectTarget,
  ProjectTargetDocument,
  ProjectTargetReview,
} from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery,
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetParameter,
  ProjectTargetReviewParameter
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
  getTargetReview = 'project/target/review/getOne',
  setTargetReview = 'project/target/review/setOne',
  addTargetReview = 'project/target/review/add',
  updateTargetReview = 'project/target/review/update',
  removeTargetReview = 'project/target/review/remove',
  confirmTargetReview = 'project/target/review/confirm',
  setTargetReviewModal = 'project/target/review/setModal',

  getTargetDocumentList = 'project/target/document/getList',
  setTargetDocumentList = 'project/target/document/setList',
  getTargetDocument = 'project/target/document/getOne',
  setTargetDocument = 'project/target/document/setOne',
  addTargetDocument = 'project/target/document/add',
  updateTargetDocument = 'project/target/document/update',
  removeTargetDocument = 'project/target/document/remove',
  setTargetDocumentModal = 'project/target/document/setModal',
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
  setTargetReviewList: createAction(ProjectActionType.setTargetReviewList)<ListProjectTargetReview[] | undefined>(),
  getTargetReview: createAction(ProjectActionType.getTargetReview)<number>(),
  setTargetReview: createAction(ProjectActionType.setTargetReview)<ProjectTargetReview | undefined>(),
  addTargetReview: createAction(ProjectActionType.addTargetReview)<{
    projectId: number;
    params: ProjectTargetReviewParameter;
    callback: (data?: ProjectTargetReview) => void;
  }>(),
  confirmTargetReview: createAction(ProjectActionType.confirmTargetReview)<{
    id: number;
    callback: (list?: ListProjectTargetReview[]) => void;
  }>(),
  updateTargetReview: createAction(ProjectActionType.updateTargetReview)<{
    id: number;
    params: ProjectTargetReviewParameter;
    callback: (data?: ProjectTargetReview) => void;
  }>(),
  removeTargetReview: createAction(ProjectActionType.removeTargetReview)<{
    id: number;
    callback: () => void;
  }>(),
  setTargetReviewModal: createAction(ProjectActionType.setTargetReviewModal)<number | null | undefined>(),

  getTargetDocumentList: createAction(ProjectActionType.getTargetDocumentList)<number>(),
  setTargetDocumentList: createAction(ProjectActionType.setTargetDocumentList)<ProjectTargetDocument[] | undefined>(),
  getTargetDocument: createAction(ProjectActionType.getTargetDocument)<number>(),
  setTargetDocument: createAction(ProjectActionType.setTargetDocument)<ProjectTargetDocument | undefined>(),
  addTargetDocument: createAction(ProjectActionType.addTargetDocument)<{
    projectId: number;
    params: ProjectTargetDocumentAddParameter;
    callback: (data?: ProjectTargetDocument) => void;
  }>(),
  updateTargetDocument: createAction(ProjectActionType.updateTargetDocument)<{
    id: number;
    params: ProjectTargetDocumentChangeParameter;
    callback: (data?: ProjectTargetDocument) => void;
  }>(),
  removeTargetDocument: createAction(ProjectActionType.removeTargetDocument)<{
    id: number;
    callback: () => void;
  }>(),
  setTargetDocumentModal: createAction(ProjectActionType.setTargetDocumentModal)<number | null | undefined>(),
};
