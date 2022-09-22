import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectContractId,
  ProjectContractVO,
} from 'project_contract/domain';

export enum ProjectContractActionType {
  setProjectId         = 'project/sales/contract/project-id/set',
  setList              = 'project/sales/contract-list/set',
  setDetail            = 'project/sales/contract/set',
  setCustomAddModal    = 'project/sales/custom-contract/add-modal/set',
  setCustomConfirmModal    = 'project/sales/custom-contract/confirm-modal/set',
  setCustomDetailModal = 'project/sales/custom-contract/detail-modal/set',
}

export const projectContractAction = {
  setProjectId:         createAction(ProjectContractActionType.setProjectId)<ProjectId | undefined>(),
  setList:              createAction(ProjectContractActionType.setList)<ProjectContractVO[] | undefined>(),
  setDetail:            createAction(ProjectContractActionType.setDetail)<ProjectContractVO | undefined>(),
  setCustomAddModal:    createAction(ProjectContractActionType.setCustomAddModal)<undefined>(),
  setCustomConfirmModal: createAction(ProjectContractActionType.setCustomConfirmModal)<ProjectContractId | undefined>(),
  setCustomDetailModal: createAction(ProjectContractActionType.setCustomDetailModal)<ProjectContractId | undefined>(),
};