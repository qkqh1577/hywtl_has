export type ContractConditionId = number & { readonly _brand: unique symbol; }

export function ContractConditionId(id: number) {
  return id as ContractConditionId;
}

export interface ContractConditionVOFromServer{
  id: ContractConditionId | '';
  title: string;
  descriptionList: string[];
}

export interface ContractConditionVO {
  contractConditionList: {
    id: ContractConditionId | '';
    title: string;
    descriptionList: string[];
  }[];
}

export const initialContractConditionVO: ContractConditionVO = {
  contractConditionList: [],
};
