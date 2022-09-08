import { ContractConditionVO } from 'admin/contract/condition/domain';
import {
  action,
  createReducer
} from 'typesafe-actions';
import { ContractConditionAction } from 'admin/contract/condition/saga';

export interface ContractConditionState {
  template?: ContractConditionVO;
}

const initialContractConditionState = {};

export const contractConditionReducer = createReducer(initialContractConditionState, {
  [ContractConditionAction.setOne]: (state,
                                     action
                                    ) => ({
    ...state,
    template: action.payload,
  })
});
