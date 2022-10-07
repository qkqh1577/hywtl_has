export type ContractConditionId = number & { readonly _brand: unique symbol; }

export function ContractConditionId(id: number) {
  return id as ContractConditionId;
}

export interface ContractConditionVO {
  id: ContractConditionId;
  title: string;
  descriptionList: string[];
}

export interface ContractConditionListVO {
  contractConditionList: ContractConditionVO[];
}

export interface ContractConditionVariableVO {
  name: string;
  note: string;
}
