import { createAction } from 'typesafe-actions';
import { AddressQuery } from 'components/AddressModal/query';
import { Address } from 'components/AddressModal/domain';

export enum AddressModalType {
  addressModal = 'address/modal',
  setFilter    = 'address/filter/set',
  setList      = 'address/List/set',
  setTotalPage = 'address/totalPage/set',
}

export const addressModalAction = {
  addressModal: createAction(AddressModalType.addressModal)<Boolean>(),
  setFilter:    createAction(AddressModalType.setFilter)<AddressQuery>(),
  setList:      createAction(AddressModalType.setList)<Address[]>(),
  setTotalPage:    createAction(AddressModalType.setTotalPage)<number>(),
};
