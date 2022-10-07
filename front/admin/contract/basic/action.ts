import { createAction } from 'typesafe-actions';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import { ContractBasicParameter } from 'admin/contract/basic/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ContractBasicActionType {
  requestOne    = 'admin/contract-basic/request',
  setOne        = 'admin/contract-basic/set',
  upsert        = 'admin/contract-basic/upsert',
  requestUpsert = 'admin/contract-basic/upsert/request',
}

export const contractBasicAction = {
  requestOne:    createAction(ContractBasicActionType.requestOne)(),
  setOne:        createAction(ContractBasicActionType.setOne)<ContractBasicVO | undefined>(),
  upsert:        createAction(ContractBasicActionType.upsert)<ContractBasicParameter>(),
  requestUpsert: createAction(ContractBasicActionType.requestUpsert)<ApiStatus>(),
};
