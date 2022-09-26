import { ContractBasicVO } from 'admin/contract/basic/domain';
import { createReducer } from 'typesafe-actions';
import { ContractBasicAction } from 'admin/contract/basic/action';
import { initialContractBasicParameter } from 'admin/contract/basic/parameter';

export interface ContractBasicState {
  template: ContractBasicVO;
}

const initialContractBasicState: ContractBasicState = {
  template: initialContractBasicParameter,
};

export const contractBasicReducer = createReducer(initialContractBasicState, {
  [ContractBasicAction.setOne]: (state,
                                 action
                                ) => ({
    ...state,
    template: action.payload,
  }),
});
