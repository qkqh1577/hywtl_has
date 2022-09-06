import { ContractBasicVO, Contractor } from 'admin/contract/basic/domain';

export interface ContractBasicParameter extends ContractBasicVO{

}

export const initialContractorParameter: Contractor = {
  address: '',
  ceoName: '',
  companyName: ''
}

export const initialContractBasicParameter: ContractBasicVO = {
  collectionStageNote: '',
  description: '',
  outcome: '',
  serviceDuration: '',
  contractor: initialContractorParameter,
}