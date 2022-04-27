import { createAction } from 'typesafe-actions';
import Project, { ListProject, ProjectBasic, ProjectBuilding } from 'services/project/entity';
import Page from 'components/Page';
import {
  ProjectBasicParameter,
  ProjectBuildingParameter,
  ProjectQuery
} from 'services/project/parameter';

export enum ProjectActionType {
  getPage = 'project/getPage',
  setPage = 'project/setPage',
  getOne = 'project/getBasic',
  setOne = 'project/setOne',
  getBasic = 'project/getBasic',
  setBasic = 'project/setBasic',
  getBuilding = 'project/getBuilding',
  setBuilding = 'project/setBuilding',
  add = 'project/add',
  updateBasic = 'project/updateBasic',
  updateBuilding = 'project/updateBuilding',
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
  getBuilding: createAction(ProjectActionType.getBuilding)<number>(),
  setBuilding: createAction(ProjectActionType.setBuilding)<ProjectBuilding | undefined>(),
  add: createAction(ProjectActionType.add)<{
    params: ProjectBasicParameter;
    callback: (data?: Project) => void;
  }>(),
  updateBasic: createAction(ProjectActionType.updateBasic)<{
    projectId: number;
    params: ProjectBasicParameter;
    callback: (data?: ProjectBasic) => void;
  }>(),
  updateBuilding: createAction(ProjectActionType.updateBuilding)<{
    projectId: number;
    params: ProjectBuildingParameter;
    callback: (data?: ProjectBuilding) => void;
  }>(),
  getAddModal: createAction(ProjectActionType.getAddModal)(),
  setAddModal: createAction(ProjectActionType.setAddModal)<boolean>(),
};
