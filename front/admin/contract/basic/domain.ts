export interface ContractBasicVO {
  serviceDuration?: string; // 용역기간
  collectionStageNote?: string; // 기성단계 설명
  outcome?: string; // 성과품
  description?: string // 내용
  contractor: Contractor;
}

export interface Contractor {
  address: string;
  companyName: string;
  ceoName: string;
}