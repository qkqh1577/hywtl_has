import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectContractId,
  ProjectContractVO,
} from 'project_contract/domain';
import {
  ProjectContractAddParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import { ProjectEstimateVO } from 'project_contract/domain';

export enum ProjectContractActionType {
  setProjectId      = 'project/sales/contract/project-id/set',
  setList           = 'project/sales/contract-list/set',
  setDetail         = 'project/sales/contract/set',
  setAddModal       = 'project/sales/contract/add-modal/set',
  setConfirmModal   = 'project/sales/contract/confirm-modal/set',
  setDetailModal    = 'project/sales/contract/detail-modal/set',
  addContract       = 'project/sales/contract/add',
  setEstimateList   = 'project/sales/contract/estimate-list/set',
  setEstimateDetail = 'project/sales/contract/estimate/set',
}

export const projectContractAction = {
  setProjectId:      createAction(ProjectContractActionType.setProjectId)<ProjectId | undefined>(),
  setList:           createAction(ProjectContractActionType.setList)<ProjectContractVO[] | undefined>(),
  setDetail:         createAction(ProjectContractActionType.setDetail)<ProjectContractVO | undefined>(),
  setAddModal:       createAction(ProjectContractActionType.setAddModal)<boolean | undefined>(),
  setConfirmModal:   createAction(ProjectContractActionType.setConfirmModal)<ProjectContractId | undefined>(),
  setDetailModal:    createAction(ProjectContractActionType.setDetailModal)<ProjectContractId | undefined>(),
  addContract:       createAction(ProjectContractActionType.addContract)<ProjectContractParameter | undefined>(),
  setEstimateList:   createAction(ProjectContractActionType.setEstimateList)<ProjectEstimateVO[] | undefined>(),
  setEstimateDetail: createAction(ProjectContractActionType.setEstimateDetail)<ProjectEstimateVO | undefined>(),
};