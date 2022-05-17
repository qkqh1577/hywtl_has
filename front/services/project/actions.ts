import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import {
  ListProject,
  Project,
  ProjectBasic,
  ProjectBasicParameter,
  ProjectOrder,
  ProjectOrderParameter,
  ProjectQuery,
} from 'services/project';

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
};
