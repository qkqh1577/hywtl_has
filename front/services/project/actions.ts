import { createAction } from 'typesafe-actions';
import Page from 'components/Page';
import Project, { ListProject, ProjectBasic } from 'services/project/entity';
import { ProjectBasicParameter, ProjectQuery } from 'services/project/parameter';

export enum ProjectActionType {
  getPage = 'project/getPage',
  setPage = 'project/setPage',
  getOne = 'project/getBasic',
  setOne = 'project/setOne',
  getBasic = 'project/getBasic',
  setBasic = 'project/setBasic',
  add = 'project/add',
  updateBasic = 'project/updateBasic',
  getAddModal = 'project/getAddModal',
  setAddModal = 'project/setAddModal',
}

export const projectActions = {
  getPage: createAction(ProjectActionType.getPage)<ProjectQuery>(),
  setPage: createAction(ProjectActionType.setPage)<Page<ListProject>>(),
  getOne: createAction(ProjectActionType.getOne)<number>(),
  setOne: createAction(ProjectActionType.setOne)<Project | undefined>(),
  getBasic: createAction(ProjectActionType.getBasic)<number>(),
  setBasic: createAction(ProjectActionType.setBasic)<ProjectBasic | undefined>(),
  add: createAction(ProjectActionType.add)<{
    params: ProjectBasicParameter;
    callback: (data?: Project) => void;
  }>(),
  updateBasic: createAction(ProjectActionType.updateBasic)<{
    projectId: number;
    params: ProjectBasicParameter;
    callback: (data?: ProjectBasic) => void;
  }>(),
  getAddModal: createAction(ProjectActionType.getAddModal)(),
  setAddModal: createAction(ProjectActionType.setAddModal)<boolean>(),
};
