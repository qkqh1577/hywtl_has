/**
 * 실험 타입
 */
export enum TestType {
  /** 공통 */
  COMMON = 'COMMON',
  /** 풍력 실험, Wind Force Test */
  F      = 'F',
  /** 풍압 실험, Wind Pressure Test */
  P      = 'P',
  /** 공기력 진동 실험 Aeroelastic Test */
  A      = 'A',
  /** 풍환경 실험, Wind Environment Test */
  E      = 'E',
  /** 빌딩풍 시뮬레이션, Building Wind Simulation Test */
  B      = 'B',
  /** 구검(건축구조설계사 검토), Architectural Structures Engineer Review */
  REVIEW = 'REVIEW'
}

export function testTypeName(testType: TestType | '') {
  switch (testType) {
    case TestType.COMMON:
      return '공통';
    case TestType.F:
      return 'F';
    case TestType.P:
      return 'P';
    case TestType.A:
      return 'A';
    case TestType.E:
      return 'E';
    case TestType.B:
      return 'B';
    case TestType.REVIEW:
      return '구검';
    default:
      return '-';
  }
}

export const testTypeList: TestType[] = [
  TestType.COMMON,
  TestType.F,
  TestType.P,
  TestType.A,
  TestType.E,
  TestType.B,
  TestType.REVIEW
];

/**
 * 견적서 세부 항목 단위
 */
export enum TestUnit {
  /** 단지 */
  SITE     = 'SITE',
  /** 동 */
  BUILDING = 'BUILDING',
}

export function testUnitName(unit: TestUnit | '') {
  switch (unit) {
    case TestUnit.SITE:
      return '단지';
    case TestUnit.BUILDING:
      return '동';
    default :
      return '-';
  }
}

export const testUnitList: TestUnit[] = [
  TestUnit.SITE,
  TestUnit.BUILDING
];

export type EstimateTemplateId = number & { readonly _brand: unique symbol; }

export function EstimateTemplateId(id: number) {
  return id as EstimateTemplateId;
}

export interface EstimateTemplateDetailVO {
  titleList: string[];
  unit: TestUnit;
  unitAmount: number;
  note?: string;
}

export interface EstimateTemplateVO {
  id: EstimateTemplateId;
  title: string;
  testType: TestType;
  detailList: EstimateTemplateDetailVO[];
}


export interface EstimateTemplateShort
  extends Omit<EstimateTemplateVO, |'detailList'> {
  detailCount: number;
}