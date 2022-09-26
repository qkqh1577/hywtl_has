import { createAction } from 'typesafe-actions';
import {
  ContractConditionListVO,
  ContractConditionVariableVO,
} from 'admin/contract/condition/domain';
import { ContractConditionParameter } from 'admin/contract/condition/parameter';

export enum ContractConditionAction {
  getOne          = 'admin/contract-condition/get',
  setOne          = 'admin/contract-condition/one/set',
  upsert          = 'admin/contract-condition/upsert',
  getVariableList = 'admin/contract-condition/variable-list/get',
  setVariableList = 'admin/contract-condition/variable-list/set',
}

export const contractConditionAction = {
  getOne:          createAction(ContractConditionAction.getOne)(),
  setOne:          createAction(ContractConditionAction.setOne)<ContractConditionListVO | undefined>(),
  upsert:          createAction(ContractConditionAction.upsert)<ContractConditionParameter>(),
  getVariableList: createAction(ContractConditionAction.getVariableList)(),
  setVariableList: createAction(ContractConditionAction.setVariableList)<ContractConditionVariableVO[]>(),
};
