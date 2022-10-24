import { UserVO } from 'user/domain';
import { ProjectDocumentShortVO } from 'project_document/domain';
import { TestType } from 'type/TestType';

export type Difficulty = '상' | '중상' | '중' | '중하' | '하';
export const difficultyList: Difficulty[] = ['상', '중상', '중', '중하', '하'];

export type ProjectComplexSiteId = number & { readonly _brand: unique symbol; }

export function ProjectComplexSiteId(id: number) {
  return id as ProjectComplexSiteId;
}

export interface ProjectComplexSiteVO {
  id: ProjectComplexSiteId;
  name?: string; // 대지모형 이름
  withEnvironmentTest?: boolean; // 실험 종류 E 여부
  estimateFigureDifficulty?: Difficulty; // 견적 대지모형 제작 난이도
  figureDifficulty?: Difficulty; // 대지모형 제작 난이도
  manager?: UserVO;
  modifiedAt: Date;
}

export type ProjectComplexBuildingId = number & { readonly _brand: unique symbol; }

export function ProjectComplexBuildingId(id: number) {
  return id as ProjectComplexBuildingId;
}

export interface ProjectComplexBuildingVO {
  id: ProjectComplexBuildingId;
  name?: string;
  site?: ProjectComplexSiteVO;
  shape?: string;
  floorCount?: number;
  height?: number;
  baseArea?: number;
  ratio?: number;
  buildingDocument?: ProjectDocumentShortVO;
  conditionList?: string[];
  inTest?: boolean;
  testTypeList?: TestType[];
  estimateFigureDifficulty?: Difficulty; // 견적 제작 난이도
  estimateTestDifficulty?: Difficulty; // 견적 실험 난이도
  estimateEvaluationDifficulty?: Difficulty; // 견적 평가 난이도
  estimateReportDifficulty?: Difficulty; // 견적 보고서 난이도
  modifiedAt: Date;
}

export interface ProjectComplexTestVO {
  siteCount: number;
  targetTest: string;
  testList: {
    testType: TestType;
    buildingCount: number;
    buildingNameList: string[];
  }[];
}