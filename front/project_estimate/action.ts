import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectEstimateId,
  ProjectEstimateType,
  ProjectEstimateVO,
} from 'project_estimate/domain';
import { ProjectCustomEstimateAddParameter } from 'project_estimate/parameter';

export enum ProjectEstimateActionType {
  setProjectId         = 'project/sales/estimate/project-id/set',
  setList              = 'project/sales/estimate-list/set',
  setDetail            = 'project/sales/estimate/set',
  setCustomAddModal    = 'project/sales/custom-estimate/add-modal/set',
  addCustom            = 'project/sales/custom-estimate/add',
  requestAdd           = 'project/sales/estimate/add/request',
  setCustomDetailModal = 'project/sales/custom-estimate/detail-modal/set',
}

export const projectEstimateAction = {
  setProjectId:         createAction(ProjectEstimateActionType.setProjectId)<ProjectId | undefined>(),
  setList:              createAction(ProjectEstimateActionType.setList)<ProjectEstimateVO[] | undefined>(),
  setDetail:            createAction(ProjectEstimateActionType.setDetail)<ProjectEstimateVO | undefined>(),
  setCustomAddModal:    createAction(ProjectEstimateActionType.setCustomAddModal)<ProjectEstimateType | undefined>(),
  addCustom:            createAction(ProjectEstimateActionType.addCustom)<ProjectCustomEstimateAddParameter>(),
  requestAdd:           createAction(ProjectEstimateActionType.requestAdd)<string>(),
  setCustomDetailModal: createAction(ProjectEstimateActionType.setCustomDetailModal)<ProjectEstimateId | undefined>(),
};