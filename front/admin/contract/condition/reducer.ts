import {
  ContractConditionListVO,
  ContractConditionVariableVO,
} from 'admin/contract/condition/domain';
import { createReducer } from 'typesafe-actions';
import { ContractConditionAction } from 'admin/contract/condition/action';

export interface ContractConditionState {
  template?:   ContractConditionListVO;
  variableList?: ContractConditionVariableVO[];
}

const initialContractConditionState = {};

export const contractConditionReducer = createReducer(initialContractConditionState, {
  [ContractConditionAction.setOne]: (state,
                                     action
                                    ) => ({
    ...state,
    template: action.payload,
  }),
  [ContractConditionAction.setVariableList]: (state,
                                              action
                                    ) => ({
    ...state,
    variableList: action.payload,
  })
});
