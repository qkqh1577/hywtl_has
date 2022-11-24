import { AddressModalType } from 'components/AddressModal/action';
import { createReducer } from 'typesafe-actions';
import { Address } from 'components/AddressModal/domain';

export interface AddressState {
  list: Address[];
  addressModal: boolean;
  setFilter?: string;
  totalPage?: number;
}

const initial: AddressState = {list: [], addressModal: false};

export const addressReducer = createReducer(initial, {
  [AddressModalType.addressModal]: (state,
                                    action
                                   ) => {
    const { payload } = action;
    return {
      ...state,
      addressModal: payload,
    };
  },
  [AddressModalType.setFilter]:    (state,
                                    action
                                   ) => {
    const { payload } = action;
    return {
      ...state,
      setFilter: payload,
    };
  },
  [AddressModalType.setList]:      (state,
                                    action
                                   ) => {
    const { payload } = action;
    return {
      ...state,
      list: payload,
    };
  },
  [AddressModalType.setTotalPage]:    (state,
                                    action
                                   ) => {
    const { payload } = action;
    return {
      ...state,
      totalPage: payload,
    };
  },
});
