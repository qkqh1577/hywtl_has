import { ContractBasicVO } from 'admin/contract/basic/domain';
import { createReducer } from 'typesafe-actions';
import { ContractBasicAction } from 'admin/contract/basic/action';

export interface ContractBasicState {
  template?: ContractBasicVO;
}

const initialContractBasicState = {};

export const contractBasicReducer = createReducer(initialContractBasicState, {
  [ContractBasicAction.setPage]: (state,
                                  action
                                 ) => ({
    ...state,
    template: action.payload,
  }),
});
