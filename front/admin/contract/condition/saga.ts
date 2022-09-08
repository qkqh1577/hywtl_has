import { createAction } from 'typesafe-actions';
import { ContractConditionVO } from 'admin/contract/condition/domain';
import { ContractConditionParameter } from 'admin/contract/condition/parameter';

export enum ContractConditionAction {
  setOne = 'admin/contract/condition/one/set',
  upsert = 'admin/contract/condition/upsert',
}

export const contractConditionAction = {
  setOne: createAction(ContractConditionAction.setOne)<ContractConditionVO | undefined>(),
  upsert: createAction(ContractConditionAction.upsert)<ContractConditionParameter>(),
};
