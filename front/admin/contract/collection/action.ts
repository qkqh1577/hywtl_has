import { createAction } from 'typesafe-actions';
import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { ContractCollectionParameter } from 'admin/contract/collection/parameter';

export enum ContractCollectionAction {
  getOne = 'admin/contract-collection/get',
  setOne = 'admin/contract-collection/set',
  upsert = 'admin/contract-collection/upsert',
}

export const contractCollectionAction = {
  getOne: createAction(ContractCollectionAction.getOne)(),
  setOne: createAction(ContractCollectionAction.setOne)<ContractCollectionVO | undefined>(),
  upsert: createAction(ContractCollectionAction.upsert)<ContractCollectionParameter>(),
};
