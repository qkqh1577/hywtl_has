import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { createReducer } from 'typesafe-actions';
import { ContractCollectionActionType } from 'admin/contract/collection/action';
import { ApiStatus } from 'components/DataFieldProps';
import { initialContractCollectionParameter } from 'admin/contract/collection/parameter';

export interface ContractCollectionState {
  template: ContractCollectionVO;
  requestUpsert: ApiStatus;
}

const initialContractCollectionState = {
  template:      initialContractCollectionParameter,
  requestUpsert: 'idle',
};

export const contractCollectionReducer = createReducer(initialContractCollectionState, {
  [ContractCollectionActionType.setOne]:        (state,
                                                 action
                                                ) => ({
    ...state,
    template: action.payload,
  }),
  [ContractCollectionActionType.requestUpsert]: (state,
                                                 action
                                                ) => ({
    ...state,
    requestUpsert: action.payload,
  })
});
