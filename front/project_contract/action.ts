import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectContractBasicVO,
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { ProjectContractParameter } from 'project_contract/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  ProjectEstimateVO,
  ProjectSystemEstimateVO
} from 'project_estimate/domain';

export enum ProjectContractActionType {
  add              = 'project/sales/contract/add',
  change           = 'project/sales/contract/change',
  deleteOne        = 'project/sales/contract/delete',
  requestAdd       = 'project/sales/contract/add/request',
  requestChange    = 'project/sales/contract/change/request',
  requestDelete    = 'project/sales/contract/delete/request',
  requestSetFinal  = 'project/sales/contract/final/request',
  setDetail        = 'project/sales/contract/set',
  setFinal         = 'project/sales/contract/final',
  setFinalModal    = 'project/sales/contract/final-modal',
  setList          = 'project/sales/contract-list/set',
  setModal         = 'project/sales/contract/modal/set',
  setProjectId     = 'project/sales/contract/project-id/set',
  getEstimate      = 'project/sales/contract/estimate/get',
  setEstimate      = 'project/sales/contract/estimate/set',
  setBasic         = 'project/sales/contract/basic/set',
  setCollection    = 'project/sales/contract/collection/set',
  setConditionList = 'project/sales/contract/condition-list/set',
  setDetailBasedEstimate = 'project/sales/contract-based-estimate/set'
}

export const projectContractAction = {
  add:              createAction(ProjectContractActionType.add)<ProjectContractParameter>(),
  change:           createAction(ProjectContractActionType.change)<ProjectContractParameter>(),
  deleteOne:        createAction(ProjectContractActionType.deleteOne)<ProjectContractId>(),
  requestAdd:       createAction(ProjectContractActionType.requestAdd)<ApiStatus>(),
  requestChange:    createAction(ProjectContractActionType.requestChange)<ApiStatus>(),
  requestDelete:    createAction(ProjectContractActionType.requestDelete)<ApiStatus>(),
  requestSetFinal:  createAction(ProjectContractActionType.requestSetFinal)<ApiStatus>(),
  setDetail:        createAction(ProjectContractActionType.setDetail)<ProjectContractVO | undefined>(),
  setFinal:         createAction(ProjectContractActionType.setFinal)<ProjectContractId[]>(),
  setFinalModal:    createAction(ProjectContractActionType.setFinalModal)<boolean>(),
  setList:          createAction(ProjectContractActionType.setList)<ProjectContractShortVO[] | undefined>(),
  setModal:         createAction(ProjectContractActionType.setModal)<ProjectContractId | null | undefined | ProjectSystemEstimateVO | ProjectCustomEstimateVO>(),
  setProjectId:     createAction(ProjectContractActionType.setProjectId)<ProjectId | undefined>(),
  getEstimate:      createAction(ProjectContractActionType.getEstimate)<ProjectEstimateId | undefined>(),
  setEstimate:      createAction(ProjectContractActionType.setEstimate)<ProjectEstimateVO | undefined>(),
  setBasic:         createAction(ProjectContractActionType.setBasic)<ProjectContractBasicVO | undefined>(),
  setCollection:    createAction(ProjectContractActionType.setCollection)<ProjectContractCollectionVO | undefined>(),
  setConditionList: createAction(ProjectContractActionType.setConditionList)<ProjectContractConditionVO[] | undefined>(),
  setDetailBasedEstimate: createAction(ProjectContractActionType.setDetailBasedEstimate)<ProjectSystemEstimateVO>(),
};
