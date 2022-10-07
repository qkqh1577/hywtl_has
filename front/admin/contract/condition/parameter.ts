import {
  ContractConditionId,
  ContractConditionListVO,
  ContractConditionVO,
} from 'admin/contract/condition/domain';

export interface ContractConditionListParameter
  extends ContractConditionListVO {

}

export interface ContractConditionParameter
  extends Omit<ContractConditionVO, |'id'> {
  id: ContractConditionId | undefined;
}

export const initialContractConditionParameter = {
  id:              undefined,
  title:           '',
  descriptionList: []
} as ContractConditionParameter;

export const initialContractConditionListParameter = {
  contractConditionList: [initialContractConditionParameter]
} as ContractConditionListParameter;