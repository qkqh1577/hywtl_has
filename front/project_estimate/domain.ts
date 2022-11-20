import { UserShortVO, } from 'user/domain';
import { BusinessShortVO } from 'business/domain';
import { ProjectDocumentShortVO } from 'project_document/domain';
import { TestType } from 'type/TestType';
import { FileItemView } from 'file-item';

export type ProjectEstimateId = number & { readonly  _brand: unique symbol; };

export function ProjectEstimateId(id: number) {
  return id as ProjectEstimateId;
}

export enum ProjectEstimateType {
  CUSTOM         = 'CUSTOM',
  SYSTEM         = 'SYSTEM',
  COMPARISON     = 'COMPARISON',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
}

export function projectEstimateTypeName(type: ProjectEstimateType) {
  switch (type) {
    case ProjectEstimateType.CUSTOM:
      return '커스텀';
    case ProjectEstimateType.SYSTEM:
      return '시스템';
    case ProjectEstimateType.COMPARISON:
      return '대비';
    case ProjectEstimateType.SUB_CONTRACTOR:
      return '협력';
    default:
      return '-';
  }
}

export interface ProjectEstimateTestDetailVO {
  testType: TestType;
  buildingCount: number;
  buildingNameList: string[];
}

export interface ProjectEstimateTestVO {
  siteCount?: number;
  targetTest?: string;
  testList?: ProjectEstimateTestDetailVO[];
}

export interface ProjectEstimateVO {
  id: ProjectEstimateId;
  code: string;
  type: ProjectEstimateType;
  isSent: boolean;
  confirmed: boolean;
  recipient: string;
  note?: string;
  createdBy: UserShortVO;
  createdAt: Date;
  modifiedAt?: Date;
  plan?: ProjectEstimatePlanVO;
  siteList?: ProjectEstimateComplexSiteVO[];
  buildingList?: ProjectEstimateComplexBuildingVO[];
  business: BusinessShortVO;
  test?: ProjectEstimateTestVO;
}

export interface ProjectEstimatePlanVO {
  estimateDate: Date;
  isLh: boolean;
  expectedServiceDate: Date;
  expectedTestDeadline: number;
  expectedFinalReportDeadline: number;
  testAmount: number;
  reviewAmount: number;
  discountAmount: number;
  totalAmount: number;
  manager1?: UserShortVO;
  manager2?: UserShortVO;
}

export interface ProjectEstimateComplexSiteVO {
  id: number;
  name: string;
  withEnvironmentTest?: boolean;
  estimateFigureDifficulty?: string;
  figureDifficulty?: string;
  manager?: UserShortVO;
}

export interface ProjectEstimateComplexBuildingVO {
  id: number;
  name: string;
  site?: ProjectEstimateComplexSiteVO;
  shape?: string;
  floorCount?: number;
  height?: number;
  baseArea?: number;
  rate?: number;
  buildingDocument?: ProjectDocumentShortVO;
  conditionList?: string[];
  inTest?: boolean;
  testTypeList?: TestType[];
  estimateFigureDifficulty?: string;
  estimateTestDifficulty?: string;
  estimateEvaluationDifficulty?: string;
  estimateReportDifficulty?: string;
}

export interface ProjectCustomEstimateVO
  extends ProjectEstimateVO {
  file: FileItemView;
}

export interface ProjectSystemEstimateVO
  extends ProjectEstimateVO {
  templateList: ProjectEstimateTemplateVO[];
  contentList: string[];
}

export interface ProjectEstimateTemplateVO {
  title: string;
  testType: TestType;
  detailList: ProjectEstimateTemplateDetailVO[];
}

export interface ProjectEstimateTemplateDetailVO {
  titleList: string[];
  unit: string;
  testCount: number;
  unitAmount: number;
  totalAmount: number;
  inUse: boolean;
  note?: string;
}


