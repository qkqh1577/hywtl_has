import { createAction } from 'typesafe-actions';
import {
  ContractConditionListVO,
  ContractConditionVariableVO,
} from 'admin/contract/condition/domain';
import { ContractConditionListParameter } from 'admin/contract/condition/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ContractConditionActionType {
  requestOne          = 'admin/contract-condition/one/request',
  setOne              = 'admin/contract-condition/one/set',
  upsert              = 'admin/contract-condition/upsert',
  requestUpsert       = 'admin/contract-condition/upsert/request',
  requestVariableList = 'admin/contract-condition/variable-list/request',
  setVariableList     = 'admin/contract-condition/variable-list/set',
}

export const contractConditionAction = {
  requestOne:          createAction(ContractConditionActionType.requestOne)(),
  setOne:              createAction(ContractConditionActionType.setOne)<ContractConditionListVO | undefined>(),
  upsert:              createAction(ContractConditionActionType.upsert)<ContractConditionListParameter>(),
  requestUpsert:       createAction(ContractConditionActionType.requestUpsert)<ApiStatus>(),
  requestVariableList: createAction(ContractConditionActionType.requestVariableList)(),
  setVariableList:     createAction(ContractConditionActionType.setVariableList)<ContractConditionVariableVO[]>(),
};
