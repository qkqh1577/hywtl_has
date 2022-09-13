export type ContractConditionId = number & { readonly _brand: unique symbol; }

export function ContractConditionId(id: number) {
  return id as ContractConditionId;
}

export interface ContractConditionVOFromServer {
  id: ContractConditionId | '';
  title: string;
  descriptionList: string[];
  newDescription?: string;
}

export interface ContractConditionVO {
  contractConditionList: ContractConditionVOFromServer[];
}

export const initialContractConditionVO: ContractConditionVO = {
  contractConditionList: [],
};

export const initialContractConditionVOFromServer: ContractConditionVOFromServer = {
  id:              '',
  title:           '',
  descriptionList: []
};

export interface ContractConditionVariableVO {
  name: string;
  note: string;
}
