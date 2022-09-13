import { createAction } from 'typesafe-actions';
import {
  ContractConditionListVO,
  ContractConditionVariableVO,
} from 'admin/contract/condition/domain';
import { ContractConditionParameter } from 'admin/contract/condition/parameter';
import { FormikSubmit } from 'type/Form';

export enum ContractConditionAction {
  setOne          = 'admin/contract/condition/one/set',
  upsert          = 'admin/contract/condition/upsert',
  setVariableList = 'admin/contract/condition/variable-list/set'
}

export const contractConditionAction = {
  setOne:          createAction(ContractConditionAction.setOne)<ContractConditionListVO | undefined>(),
  upsert:          createAction(ContractConditionAction.upsert)<FormikSubmit<ContractConditionParameter>>(),
  setVariableList: createAction(ContractConditionAction.setVariableList)<ContractConditionVariableVO[]>(),
};
