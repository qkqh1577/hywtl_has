import { createAction } from 'typesafe-actions';
import {
  ListProjectEstimateSheet,
  ProjectEstimate,
  ProjectEstimateParameter,
  ProjectEstimateSheet,
  ProjectEstimateSheetAddParameter,
} from 'services/project_estimate';

export enum ProjectEstimateType {
  getOne = 'project/estimate/getOne',
  setOne = 'project/estimate/setOne',
  upsert = 'project/estimate/upsert',

  getSheetList = 'project/estimate/sheet/getList',
  setSheetList = 'project/estimate/sheet/setList',

  getSheetOne = 'project/estimate/sheet/getOne',
  setSheetOne = 'project/estimate/sheet/setOne',

  addSheet = 'project/estimate/sheet/add',

  setSheetId = 'project/estimate/sheet/setId',
}

export const projectEstimateActions = {
  getOne: createAction(ProjectEstimateType.getOne)<number>(),
  setOne: createAction(ProjectEstimateType.setOne)<ProjectEstimate | undefined>(),
  upsert: createAction(ProjectEstimateType.upsert)<{
    params: ProjectEstimateParameter;
    callback: () => void;
  }>(),

  getSheetList: createAction(ProjectEstimateType.getSheetList)<number>(),
  setSheetList: createAction(ProjectEstimateType.setSheetList)<ListProjectEstimateSheet[] | undefined>(),

  getSheetOne: createAction(ProjectEstimateType.getSheetOne)<number>(),
  setSheetOne: createAction(ProjectEstimateType.setSheetOne)<ProjectEstimateSheet | undefined>(),

  addSheet: createAction(ProjectEstimateType.addSheet)<{
    params: ProjectEstimateSheetAddParameter;
    callback: () => void;
  }>(),

  setSheetId: createAction(ProjectEstimateType.setSheetId)<number | null | undefined>(),
};