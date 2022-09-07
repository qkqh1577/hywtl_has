import {
  ContractCollectionVO,
  ExpectedDateType
} from 'admin/contract/collection/domain';

export interface ContractCollectionParameter
  extends ContractCollectionVO {

}

export const initialContractCollectionParameter: ContractCollectionVO = {
  stageList:       [{
    name: '',
    ratio: '',
    note: '',
    expectedDate: ExpectedDateType.CONTRACT_DAY
  }],
  totalAmountNote: ''
};
