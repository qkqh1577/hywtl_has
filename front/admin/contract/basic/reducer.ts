import { ContractBasicVO } from 'admin/contract/basic/domain';
import { createReducer } from 'typesafe-actions';
import { ContractBasicActionType } from 'admin/contract/basic/action';
import { initialContractBasicParameter } from 'admin/contract/basic/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export interface ContractBasicState {
  template: ContractBasicVO;
  requestUpsert: ApiStatus;
}

const initialContractBasicState: ContractBasicState = {
  template:      initialContractBasicParameter,
  requestUpsert: 'idle',
};

export const contractBasicReducer = createReducer(initialContractBasicState, {
  [ContractBasicActionType.setOne]:        (state,
                                            action
                                           ) => ({
    ...state,
    template: action.payload,
  }),
  [ContractBasicActionType.requestUpsert]: (state,
                                            action
                                           ) => ({
    ...state,
    requestUpsert: action.payload,
  })
});
