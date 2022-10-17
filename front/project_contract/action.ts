import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { ProjectContractParameter } from 'project_contract/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectContractActionType {
  addContract           = 'project/sales/contract/add',
  changeContract        = 'project/sales/contract/change',
  requestAddContract    = 'project/sales/contract/add/request',
  requestChangeContract = 'project/sales/contract/change/request',
  requestSetFinal       = 'project/sales/contract/final/request',
  setDetail             = 'project/sales/contract/set',
  setFinal              = 'project/sales/contract/final',
  setFinalModal         = 'project/sales/contract/final-modal',
  setId                 = 'project/sales/contract/id/set',
  setList               = 'project/sales/contract-list/set',
  setModal              = 'project/sales/contract/modal/set',
  setProjectId          = 'project/sales/contract/project-id/set',
}

export const projectContractAction = {
  addContract:           createAction(ProjectContractActionType.addContract)<ProjectContractParameter>(),
  changeContract:        createAction(ProjectContractActionType.changeContract)<ProjectContractParameter>(),
  requestAddContract:    createAction(ProjectContractActionType.requestAddContract)<ApiStatus>(),
  requestChangeContract: createAction(ProjectContractActionType.requestChangeContract)<ApiStatus>(),
  requestSetFinal:       createAction(ProjectContractActionType.requestSetFinal)<ApiStatus>(),
  setDetail:             createAction(ProjectContractActionType.setDetail)<ProjectContractVO | undefined>(),
  setFinal:              createAction(ProjectContractActionType.setFinal)<ProjectContractId>(),
  setFinalModal:         createAction(ProjectContractActionType.setFinalModal)<boolean>(),
  setId:                 createAction(ProjectContractActionType.setId)<ProjectContractId | undefined>(),
  setList:               createAction(ProjectContractActionType.setList)<ProjectContractShortVO[] | undefined>(),
  setModal:              createAction(ProjectContractActionType.setModal)<ProjectContractParameter | undefined>(),
  setProjectId:          createAction(ProjectContractActionType.setProjectId)<ProjectId | undefined>(),

};
