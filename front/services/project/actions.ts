import { createAction } from 'typesafe-actions';
import Project, { ListProject } from 'services/project/entity';
import Page from 'components/Page';
import { ProjectAddParameter, ProjectQuery } from 'services/project/parameter';

export enum ProjectActionType {
  getPage = 'project/getPage',
  setPage = 'project/setPage',
  getOne = 'project/getOne',
  setOne = 'project/setOne',
  add = 'project/add',
  getAddModal = 'project/getAddModal',
  setAddModal = 'project/setAddModal',
}

export const projectActions = {
  getPage: createAction(ProjectActionType.getPage)<ProjectQuery>(),
  setPage: createAction(ProjectActionType.setPage)<Page<ListProject>>(),
  getOne: createAction(ProjectActionType.getOne)<number>(),
  setOne: createAction(ProjectActionType.setOne)<Project | undefined>(),
  add: createAction(ProjectActionType.add)<{
    params: ProjectAddParameter;
    callback: (data?: Project) => void;
  }>(),
  getAddModal: createAction(ProjectActionType.getAddModal)(),
  setAddModal: createAction(ProjectActionType.setAddModal)<boolean>(),
}
