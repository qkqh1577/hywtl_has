import { FileItemParameter } from 'file-item';
import {
  ProjectEstimateId,
  ProjectEstimateType
} from 'project_estimate/domain';
import { BusinessId } from 'business/domain';
import { UserId } from 'user/domain';
import { TestType } from 'type/TestType';
import { ProjectDocumentId } from 'project_document/domain';

export interface ProjectCustomEstimateAddParameter {
  isSent: boolean;
  businessId: BusinessId;
  recipient: string;
  note?: string;
  file: FileItemParameter;
  type: ProjectEstimateType;
}

export interface ProjectCustomEstimateChangeParameter {
  id: ProjectEstimateId;
  isSent: boolean;
  businessId: BusinessId;
  recipient: string;
  note?: string;
}

export interface ProjectCustomEstimateExtensionParameter {
  id: ProjectEstimateId;
  plan: Partial<ProjectEstimatePlanParameter>;
  siteList: ProjectEstimateComplexSiteParameter[];
  buildingList: ProjectEstimateComplexBuildingParameter[];
}

export interface ProjectSystemEstimateParameter {
  isSent: boolean;
  recipient: string;
  note?: string;
  plan: ProjectEstimatePlanParameter;
  siteList: ProjectEstimateComplexSiteParameter[];
  buildingList: ProjectEstimateComplexBuildingParameter[];
  templateList: ProjectEstimateTemplateParameter[];
  contentList: string[];
}

export interface ProjectEstimatePlanParameter {
  estimateDate: Date;
  expectedServiceDate: Date;
  expectedTestDeadline: number;
  expectedFinalReportDeadline: number;
  testAmount: number;
  reviewAmount: number;
  discountAmount: number;
  totalAmount: number;
}

export interface ProjectEstimateComplexSiteParameter {
  name: string;
  withEnvironmentTest?: boolean;
  estimateFigureDifficulty?: string;
  figureDifficulty?: string;
  managerId?: UserId;
}

export interface ProjectEstimateComplexBuildingParameter {

  name: string;
  siteId?: number;
  shape?: string;
  floorCount?: number;
  height?: number;
  baseArea?: number;
  ratio?: number;
  buildingDocumentId?: ProjectDocumentId;
  conditionList?: string[];
  inTest?: boolean;
  testTypeList?: TestType[];
  estimateFigureDifficulty?: string;
  estimateTestDifficulty?: string;
  estimateEvaluationDifficulty?: string;
  estimateReportDifficulty?: string;
}

export interface ProjectEstimateTemplateParameter {
  title: string;
  testType: TestType;
  detailList: ProjectEstimateTemplateDetailParameter[];
}

export interface ProjectEstimateTemplateDetailParameter {
  titleList: string[];
  unit: string;
  testCount: number;
  unitAmount: number;
  totalAmount: number;
  inUse: boolean;
  note?: string;
}