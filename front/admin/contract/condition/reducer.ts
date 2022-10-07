import { ContractConditionVariableVO, } from 'admin/contract/condition/domain';
import { createReducer } from 'typesafe-actions';
import { ContractConditionActionType } from 'admin/contract/condition/action';
import { ApiStatus } from 'components/DataFieldProps';
import {
  ContractConditionListParameter,
  initialContractConditionListParameter
} from 'admin/contract/condition/parameter';

export interface ContractConditionState {
  template: ContractConditionListParameter;
  variableList?: ContractConditionVariableVO[];
  requestUpsert: ApiStatus;
}

const initialContractConditionState = {
  template:      initialContractConditionListParameter,
  requestUpsert: ApiStatus.IDLE,
};

export const contractConditionReducer = createReducer(initialContractConditionState, {
  [ContractConditionActionType.setOne]:          (state,
                                                  action
                                                 ) => ({
    ...state,
    template: action.payload,
  }),
  [ContractConditionActionType.requestUpsert]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [ContractConditionActionType.setVariableList]: (state,
                                                  action
                                                 ) => ({
    ...state,
    variableList: action.payload,
  })
});
