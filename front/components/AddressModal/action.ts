import { createAction } from 'typesafe-actions';

export enum AddressModalType {
  addressModal = 'address/modal',
}

export const addressAction = {
  addressModal: createAction(AddressModalType.addressModal)<Boolean>(),
}
