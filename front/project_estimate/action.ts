import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectEstimateId,
  ProjectEstimateType,
  ProjectEstimateVO,
} from 'project_estimate/domain';
import {
  ProjectCustomEstimateAddParameter,
  ProjectCustomEstimateChangeParameter,
  ProjectSystemEstimateParameter
} from 'project_estimate/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectEstimateActionType {
  setProjectId         = 'project/sales/estimate/project-id/set',
  setList              = 'project/sales/estimate-list/set',
  setDetail            = 'project/sales/estimate/set',
  setCustomAddModal    = 'project/sales/custom-estimate/add-modal/set',
  addCustom            = 'project/sales/custom-estimate/add',
  requestAdd           = 'project/sales/estimate/add/request',
  setCustomDetailModal = 'project/sales/custom-estimate/detail-modal/set',
  requestChange        = 'project/sales/custom-estimate/change/request',
  changeCustom         = 'project/sales/custom-estimate/change',
  requestExtension     = 'project/sales/custom-estimate/extension/request',
  extensionCustom      = 'project/sales/custom-estimate/extension',
  setSystemModal       = 'project/sales/system-estimate/modal',
  addSystem            = 'project/sales/system-estimate/add',
  changeSystem         = 'project/sales/system-estimate/change',
  setFinalModal        = 'project/sales/estimate/final-modal/set',
  requestSetFinal      = 'project/sales/estimate/final/request',
  setFinal             = 'project/sales/estimate/final',
}

export const projectEstimateAction = {
  setProjectId:         createAction(ProjectEstimateActionType.setProjectId)<ProjectId | undefined>(),
  setList:              createAction(ProjectEstimateActionType.setList)<ProjectEstimateVO[] | undefined>(),
  setDetail:            createAction(ProjectEstimateActionType.setDetail)<ProjectEstimateVO | undefined>(),
  setCustomAddModal:    createAction(ProjectEstimateActionType.setCustomAddModal)<ProjectEstimateType | undefined>(),
  addCustom:            createAction(ProjectEstimateActionType.addCustom)<ProjectCustomEstimateAddParameter>(),
  requestAdd:           createAction(ProjectEstimateActionType.requestAdd)<ApiStatus>(),
  setCustomDetailModal: createAction(ProjectEstimateActionType.setCustomDetailModal)<ProjectEstimateId | undefined>(),
  requestChange:        createAction(ProjectEstimateActionType.requestChange)<ApiStatus>(),
  changeCustom:         createAction(ProjectEstimateActionType.changeCustom)<ProjectCustomEstimateChangeParameter>(),
  requestExtension:     createAction(ProjectEstimateActionType.requestExtension)<ApiStatus>(),
  extensionCustom:      createAction(ProjectEstimateActionType.extensionCustom)<>(),
  setSystemModal:       createAction(ProjectEstimateActionType.setSystemModal)<ProjectEstimateId | null | undefined>(),
  addSystem:            createAction(ProjectEstimateActionType.addSystem)<ProjectSystemEstimateParameter>(),
  changeSystem:         createAction(ProjectEstimateActionType.changeSystem)<ProjectSystemEstimateParameter>(),
  setFinalModal:        createAction(ProjectEstimateActionType.setFinalModal)<>(),
  requestSetFinal:      createAction(ProjectEstimateActionType.requestSetFinal)<ApiStatus>(),
  setFinal:             createAction(ProjectEstimateActionType.setFinal)<ProjectEstimateId>(),
};