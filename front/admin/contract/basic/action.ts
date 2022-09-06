import { createAction } from 'typesafe-actions';
import { ContractBasicVO } from 'admin/contract/basic/domain';

export enum ContractBasicAction {
  setOne = 'admin/contract/basic/one/set',
}
export const contractBasicAction = {
  setOne: createAction(ContractBasicAction.setOne)<ContractBasicVO>(),
}