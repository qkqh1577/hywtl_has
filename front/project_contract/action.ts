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
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectContractActionType {
  setProjectId             = 'project/sales/contract/project-id/set',
  setList                  = 'project/sales/contract-list/set',
  setDetail                = 'project/sales/contract/set',
  setAddModal              = 'project/sales/contract/add-modal/set',
  setConfirmModal          = 'project/sales/contract/confirm-modal/set',
  setDetailModal           = 'project/sales/contract/detail-modal/set',
  addContract              = 'project/sales/contract/add',
  setEstimateList          = 'project/sales/contract/estimate-list/set',
  setEstimateDetail        = 'project/sales/contract/estimate/set',
  getVariableList          = 'project/sales/contract/condition/variable-list/get',
  setVariableList          = 'project/sales/contract/condition/variable-list/set',
  getContractBasic         = 'project/sales/contract/basic/get',
  setContractBasic         = 'project/sales/contract/basic/set',
  getContractCollection    = 'project/sales/contract/collection/get',
  setContractCollection    = 'project/sales/contract/collection/set',
  getContractConditionList = 'project/sales/contract/condition/get',
  setContractConditionList = 'project/sales/contract/condition/set',

  setFinalModal            = 'project/sales/contract/final-modal',
  setFinal                 = 'project/sales/contract/final',
  requestSetFinal          = 'project/sales/contract/final/request',
}

export const projectContractAction = {
  setProjectId:             createAction(ProjectContractActionType.setProjectId)<ProjectId | undefined>(),
  setList:                  createAction(ProjectContractActionType.setList)<ProjectContractShortVO[] | undefined>(),
  setDetail:                createAction(ProjectContractActionType.setDetail)<ProjectContractVO | undefined>(),
  setAddModal:              createAction(ProjectContractActionType.setAddModal)<boolean | undefined>(),
  setConfirmModal:          createAction(ProjectContractActionType.setConfirmModal)<ProjectContractId | undefined>(),
  setDetailModal:           createAction(ProjectContractActionType.setDetailModal)<ProjectContractId | undefined>(),
  addContract:              createAction(ProjectContractActionType.addContract)<ProjectContractParameter | undefined>(),
  setEstimateList:          createAction(ProjectContractActionType.setEstimateList)<ProjectEstimateVO[] | undefined>(),
  setEstimateDetail:        createAction(ProjectContractActionType.setEstimateDetail)<ProjectEstimateVO | undefined>(),
  getVariableList:          createAction(ProjectContractActionType.getVariableList)(),
  setVariableList:          createAction(ProjectContractActionType.setVariableList)<ContractConditionVariableVO[]>(),
  getContractBasic:         createAction(ProjectContractActionType.getContractBasic)(),
  setContractBasic:         createAction(ProjectContractActionType.setContractBasic)<ProjectContractBasicVO>(),
  getContractCollection:    createAction(ProjectContractActionType.getContractCollection)(),
  setContractCollection:    createAction(ProjectContractActionType.setContractCollection)<ProjectContractCollectionVO | undefined>(),
  getContractConditionList: createAction(ProjectContractActionType.getContractConditionList)(),
  setContractConditionList: createAction(ProjectContractActionType.setContractConditionList)<ProjectContractConditionVO[] | undefined>(),

  setFinalModal:   createAction(ProjectContractActionType.setFinalModal)<boolean>(),
  setFinal:        createAction(ProjectContractActionType.setFinal)<ProjectContractId>(),
  requestSetFinal: createAction(ProjectContractActionType.requestSetFinal)<ApiStatus>(),

};
