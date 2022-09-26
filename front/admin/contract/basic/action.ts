import { createAction } from 'typesafe-actions';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import { ContractBasicParameter } from 'admin/contract/basic/parameter';

export enum ContractBasicAction {
  getOne = 'admin/contract-basic/get',
  setOne = 'admin/contract-basic/set',
  upsert = 'admin/contract-basic/upsert',
}

export const contractBasicAction = {
  getOne: createAction(ContractBasicAction.getOne)(),
  setOne: createAction(ContractBasicAction.setOne)<ContractBasicVO | undefined>(),
  upsert: createAction(ContractBasicAction.upsert)<ContractBasicParameter>(),
};
