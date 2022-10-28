/**
 * 예정일 유형
 */
export enum ExpectedDateType {
  /**
   * 계약일
   */
  CONTRACT_DAY                        = 'CONTRACT_DAY',

  /**
   * 설풍구조납품일
   */
  DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND = 'DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND',
  /**
   * 최종보고서납품일
   */
  DAY_TO_DELIVER_FOE_FINAL_REPORT     = 'DAY_TO_DELIVER_FOE_FINAL_REPORT',
  /**
   * 직접입력
   */
  DIRECT                              = 'DIRECT',
}

export const expectedDateTypeList: ExpectedDateType[] = [
  ExpectedDateType.CONTRACT_DAY,
  ExpectedDateType.DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND,
  ExpectedDateType.DAY_TO_DELIVER_FOE_FINAL_REPORT,
  ExpectedDateType.DIRECT
];


export function expectedDateTypeName(type: ExpectedDateType | '') {
  switch (type) {
    case   ExpectedDateType.CONTRACT_DAY:
      return '계약일';
    case ExpectedDateType.DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND:
      return '설풍구조납품일';
    case ExpectedDateType.DAY_TO_DELIVER_FOE_FINAL_REPORT:
      return '최종보고서납품일';
    case ExpectedDateType.DIRECT:
      return '직접입력';
    default:
      return '-';
  }
}

export interface ContractCollectionVO {
  stageList: ContractCollectionStage[];
  totalAmountNote?: string;
}

export interface ContractCollectionStage {
  name?: string;
  rate?: number;
  note?: string;
  expectedDate?: ExpectedDateType;
}
