import { createAction } from 'typesafe-actions';
import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { ContractCollectionParameter } from 'admin/contract/collection/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ContractCollectionActionType {
  requestOne    = 'admin/contract-collection/one/request',
  setOne        = 'admin/contract-collection/set',
  upsert        = 'admin/contract-collection/upsert',
  requestUpsert = 'admin/contract-collection/upsert/request',
}

export const contractCollectionAction = {
  requestOne:    createAction(ContractCollectionActionType.requestOne)(),
  setOne:        createAction(ContractCollectionActionType.setOne)<ContractCollectionVO>(),
  upsert:        createAction(ContractCollectionActionType.upsert)<ContractCollectionParameter>(),
  requestUpsert: createAction(ContractCollectionActionType.requestUpsert)<ApiStatus>(),
};
