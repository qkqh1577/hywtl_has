import { createAction } from 'typesafe-actions';
import {
  ListProjectTarget,
  ProjectTarget,
  ProjectTargetParameter,
} from 'services/project_target';

export enum ProjectTargetActionType {
  getList = 'project/target/getList',
  setList = 'project/target/document/setList',
  getOne = 'project/target/document/getOne',
  setOne = 'project/target/document/setOne',
  add = 'project/target/document/add',
  update = 'project/target/document/update',
  remove = 'project/target/document/remove',
  setId = 'project/target/document/setId',
}

export const projectTargetActions = {
  getList: createAction(ProjectTargetActionType.getList)<number>(),
  setList: createAction(ProjectTargetActionType.setList)<ListProjectTarget[] | undefined>(),
  getOne: createAction(ProjectTargetActionType.getOne)<number>(),
  setOne: createAction(ProjectTargetActionType.setOne)<ProjectTarget | undefined>(),
  add: createAction(ProjectTargetActionType.add)<{
    projectId: number;
    params: ProjectTargetParameter;
    callback: () => void;
  }>(),
  update: createAction(ProjectTargetActionType.update)<{
    id: number;
    params: ProjectTargetParameter;
    callback: () => void;
  }>(),
  remove: createAction(ProjectTargetActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
  setId: createAction(ProjectTargetActionType.setId)<number | null | undefined>(),
};