import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  ProjectEstimateType,
  ProjectEstimateVO,
  ProjectSystemEstimateVO,
} from 'project_estimate/domain';
import {
  ProjectCustomEstimateAddParameter,
  ProjectCustomEstimateChangeParameter,
  ProjectCustomEstimateExtensionParameter,
  ProjectSystemEstimateParameter
} from 'project_estimate/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectEstimateActionType {
  addCustom               = 'project/sales/custom-estimate/add',
  addSystem               = 'project/sales/system-estimate/add',
  changeCustom            = 'project/sales/custom-estimate/change',
  changeSystem            = 'project/sales/system-estimate/change',
  deleteCustom            = 'project/sales/custom-estimate/delete',
  deleteSystem            = 'project/sales/system-estimate/delete',
  extensionCustom         = 'project/sales/custom-estimate/extension',
  requestAddCustom        = 'project/sales/custom-estimate/add/request',
  requestAddSystem        = 'project/sales/system-estimate/add/request',
  requestChangeCustom     = 'project/sales/custom-estimate/change/request',
  requestChangeSystem     = 'project/sales/system-estimate/change/request',
  requestDeleteCustom     = 'project/sales/custom-estimate/delete/request',
  requestDeleteSystem     = 'project/sales/system-estimate/delete/request',
  requestExtensionCustom  = 'project/sales/custom-estimate/extension/request',
  requestSetFinal         = 'project/sales/estimate/final/request',
  setCustomAddModal       = 'project/sales/custom-estimate/add-modal',
  setCustomDetail         = 'project/sales/custom-estimate/set',
  setCustomDetailModal    = 'project/sales/custom-estimate/detail-modal',
  setCustomExtensionModal = 'project/sales/custom-estimate/extension-modal',
  setFinal                = 'project/sales/estimate/final',
  setFinalModal           = 'project/sales/estimate/final-modal',
  setList                 = 'project/sales/estimate-list/set',
  setProjectId            = 'project/sales/estimate/project-id/set',
  setSystemDetail         = 'project/sales/system-estimate/set',
  setSystemModal          = 'project/sales/system-estimate/modal',
}

export const projectEstimateAction = {
  addCustom:               createAction(ProjectEstimateActionType.addCustom)<ProjectCustomEstimateAddParameter>(),
  addSystem:               createAction(ProjectEstimateActionType.addSystem)<ProjectSystemEstimateParameter>(),
  changeCustom:            createAction(ProjectEstimateActionType.changeCustom)<ProjectCustomEstimateChangeParameter>(),
  changeSystem:            createAction(ProjectEstimateActionType.changeSystem)<ProjectSystemEstimateParameter>(),
  deleteCustom:            createAction(ProjectEstimateActionType.deleteCustom)(),
  deleteSystem:            createAction(ProjectEstimateActionType.deleteSystem)(),
  extensionCustom:         createAction(ProjectEstimateActionType.extensionCustom)<ProjectCustomEstimateExtensionParameter>(),
  requestAddCustom:        createAction(ProjectEstimateActionType.requestAddCustom)<ApiStatus>(),
  requestAddSystem:        createAction(ProjectEstimateActionType.requestAddSystem)<ApiStatus>(),
  requestChangeCustom:     createAction(ProjectEstimateActionType.requestChangeCustom)<ApiStatus>(),
  requestChangeSystem:     createAction(ProjectEstimateActionType.requestChangeSystem)<ApiStatus>(),
  requestDeleteCustom:     createAction(ProjectEstimateActionType.requestDeleteCustom)<ApiStatus>(),
  requestDeleteSystem:     createAction(ProjectEstimateActionType.requestDeleteSystem)<ApiStatus>(),
  requestExtensionCustom:  createAction(ProjectEstimateActionType.requestExtensionCustom)<ApiStatus>(),
  requestSetFinal:         createAction(ProjectEstimateActionType.requestSetFinal)<ApiStatus>(),
  setCustomAddModal:       createAction(ProjectEstimateActionType.setCustomAddModal)<ProjectEstimateType | undefined>(),
  setCustomDetail:         createAction(ProjectEstimateActionType.setCustomDetail)<ProjectCustomEstimateVO | undefined>(),
  setCustomDetailModal:    createAction(ProjectEstimateActionType.setCustomDetailModal)<ProjectEstimateId | undefined>(),
  setCustomExtensionModal: createAction(ProjectEstimateActionType.setCustomExtensionModal)<ProjectEstimateId | undefined>(),
  setFinal:                createAction(ProjectEstimateActionType.setFinal)<ProjectEstimateId[]>(),
  setFinalModal:           createAction(ProjectEstimateActionType.setFinalModal)<boolean>(),
  setList:                 createAction(ProjectEstimateActionType.setList)<ProjectEstimateVO[] | undefined>(),
  setProjectId:            createAction(ProjectEstimateActionType.setProjectId)<ProjectId | undefined>(),
  setSystemDetail:         createAction(ProjectEstimateActionType.setSystemDetail)<ProjectSystemEstimateVO | undefined>(),
  setSystemModal:          createAction(ProjectEstimateActionType.setSystemModal)<ProjectEstimateId | null | undefined>(),

};
