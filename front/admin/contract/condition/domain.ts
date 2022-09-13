export type ContractConditionId = number & { readonly _brand: unique symbol; }

export function ContractConditionId(id: number) {
  return id as ContractConditionId;
}

export interface ContractConditionVO {
  id: ContractConditionId | '';
  title: string;
  descriptionList: string[];
}

export interface ContractConditionListVO {
  contractConditionList: ContractConditionVO[];
}

export const initialContractConditionListVO: ContractConditionListVO = {
  contractConditionList: [],
};

export const initialContractConditionVO: ContractConditionVO = {
  id:              '',
  title:           '',
  descriptionList: []
};

export interface ContractConditionVariableVO {
  name: string;
  note: string;
}
