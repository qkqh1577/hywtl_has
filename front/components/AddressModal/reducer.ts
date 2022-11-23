import { AddressModalType } from 'components/AddressModal/action';
import { createReducer } from 'typesafe-actions';

export interface AddressState {
  addressModal?: boolean;
}

const initial: AddressState = {};

export const addressReducer = createReducer(initial, {
  [AddressModalType.addressModal]:  (state,
                                   action
                                  ) => {
    const { payload } = action;
    return {
      ...state,
      addressModal: payload,
    };
  }
});
