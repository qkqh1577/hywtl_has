export interface AddressQuery {
  page: number;
  size: number;
  keyword?: string;
}

export const initialAddressQuery: AddressQuery = {
  page: 1,
  size: 5,
  keyword: ''
};
