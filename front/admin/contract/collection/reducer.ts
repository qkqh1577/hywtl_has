import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { createReducer } from 'typesafe-actions';
import { ContractCollectionAction } from 'admin/contract/collection/action';

export interface ContractCollectionState {
  template?: ContractCollectionVO;
}

const initialContractCollectionState = {};

export const contractCollectionReducer = createReducer(initialContractCollectionState, {
  [ContractCollectionAction.setOne]: (state,
                                      action
                                     ) => ({
    ...state,
    template: action.payload,
  })
});
