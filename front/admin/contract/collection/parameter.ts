import { ContractCollectionVO } from 'admin/contract/collection/domain';

export interface ContractCollectionParameter
  extends ContractCollectionVO {

}

export const initialContractCollectionParameter: ContractCollectionParameter = {
  stageList: [{
    name: '',
    note: '',
  }],
};
