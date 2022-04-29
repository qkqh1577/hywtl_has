import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import Project, { ListProject, ProjectBasic, ProjectOrder } from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery
} from 'services/project/parameter';

export enum ProjectActionType {
  getPage = 'project/getPage',
  setPage = 'project/setPage',
  getOne = 'project/getBasic',
  setOne = 'project/setOne',
  getBasic = 'project/getBasic',
  setBasic = 'project/setBasic',
  getOrder = 'project/getOrder',
  setOrder = 'project/setOrder',
  add = 'project/add',
  updateBasic = 'project/updateBasic',
  updateOrder = 'project/updateOrder',
  setAddModal = 'project/setAddModal',
}

export const projectActions = {
  getPage: createAction(ProjectActionType.getPage)<ProjectQuery>(),
  setPage: createAction(ProjectActionType.setPage)<Page<ListProject>>(),
  getOne: createAction(ProjectActionType.getOne)<number>(),
  setOne: createAction(ProjectActionType.setOne)<Project | undefined>(),
  getBasic: createAction(ProjectActionType.getBasic)<number>(),
  setBasic: createAction(ProjectActionType.setBasic)<ProjectBasic | undefined>(),
  getOrder: createAction(ProjectActionType.getOrder)<number>(),
  setOrder: createAction(ProjectActionType.setOrder)<ProjectOrder | undefined>(),
  add: createAction(ProjectActionType.add)<{
    params: ProjectBasicParameter;
    callback: (data?: Project) => void;
  }>(),
  updateBasic: createAction(ProjectActionType.updateBasic)<{
    projectId: number;
    params: ProjectBasicParameter;
    callback: (data?: ProjectBasic) => void;
  }>(),
  updateOrder: createAction(ProjectActionType.updateOrder)<{
    projectId: number;
    params: ProjectOrderParameter;
    callback: (data?: ProjectOrder) => void;
  }>(),
  setAddModal: createAction(ProjectActionType.setAddModal)<boolean>(),
};
