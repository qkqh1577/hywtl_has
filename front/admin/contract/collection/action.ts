import { createAction } from 'typesafe-actions';
import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { FormikSubmit } from 'type/Form';
import { ContractCollectionParameter } from 'admin/contract/collection/parameter';

export enum ContractCollectionAction {
  setOne = 'admin/contract/collection/one/set',
  upsert = 'admin/contract/collection/upsert',
}

export const contractCollectionAction = {
  setOne: createAction(ContractCollectionAction.setOne)<ContractCollectionVO | undefined>(),
  upsert: createAction(ContractCollectionAction.upsert)<FormikSubmit<ContractCollectionParameter>>(),
}
