import { ContractConditionVO } from 'admin/contract/condition/domain';

export interface ContractConditionParameter
  extends ContractConditionVO {}

export const initialContractConditionParameter: ContractConditionParameter = {
  id:              '',
  title:           '',
  descriptionList: [],
};
