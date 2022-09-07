import { createAction } from 'typesafe-actions';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import { FormikSubmit } from 'type/Form';
import { ContractBasicParameter } from 'admin/contract/basic/parameter';

export enum ContractBasicAction {
  setOne  = 'admin/contract/basic/one/set',
  setPage = 'admin/contract/basic/page/set',
  upsert  = 'admin/contract/basic/upsert',
}
export const contractBasicAction = {
  setOne: createAction(ContractBasicAction.setOne)(),
  setPage: createAction(ContractBasicAction.setPage)<ContractBasicVO | undefined>(),
  upsert: createAction(ContractBasicAction.upsert)<FormikSubmit<ContractBasicParameter>>(),
}
