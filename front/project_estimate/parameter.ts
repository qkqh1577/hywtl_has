import { FileItemParameter } from 'file-item';
import {
  ProjectEstimateId,
  ProjectEstimateTestVO,
  ProjectEstimateType
} from 'project_estimate/domain';
import { BusinessId } from 'business/domain';
import { UserId } from 'user/domain';
import {
  TestType,
  TestUnit
} from 'type/TestType';
import { ProjectDocumentId } from 'project_document/domain';

export interface ProjectEstimateFinalParameter {
  idList: ProjectEstimateId[];
}

export const initialProjectEstimateFinalParameter = {} as ProjectEstimateFinalParameter;

export interface ProjectEstimateBasicParameter {
  isSent: boolean | undefined;
  recipient: string;
  note?: string;
  sentDate?: string;
  confirmed?: boolean;
}

export interface ProjectCustomEstimateAddParameter
  extends ProjectEstimateBasicParameter {
  businessId: BusinessId;
  file: FileItemParameter;
  type: ProjectEstimateType;
}

export interface ProjectCustomEstimateChangeParameter
  extends ProjectEstimateBasicParameter {
  id: ProjectEstimateId;
  businessId: BusinessId;
}

export interface ProjectCustomEstimateExtensionParameter {
  id: ProjectEstimateId;
  plan: Partial<ProjectEstimatePlanParameter>;
  siteList: ProjectEstimateComplexSiteParameter[];
  buildingList: ProjectEstimateComplexBuildingParameter[];
}

export const initialProjectCustomEstimateExtensionParameter = (isLh: boolean) => {
  return {
    plan:         { isLh: isLh, hasExperimentInfo: false },
    siteList:     [],
    buildingList: [],
    edit:         true,
  } as unknown as ProjectCustomEstimateExtensionParameter;
};

export interface ProjectSystemEstimateParameter
  extends ProjectEstimateBasicParameter {
  file: FileItemParameter;
  plan: ProjectEstimatePlanParameter;
  siteList: ProjectEstimateComplexSiteParameter[];
  buildingList: ProjectEstimateComplexBuildingParameter[];
  templateList: ProjectEstimateTemplateParameter[];
  contentList: ProjectEstimateContentListToMap[];
  test?: ProjectEstimateTestVO;
}

export const initialProjectSystemEstimateParameter = (isLh: boolean) => {
  return {
    isSent:       false,
    sentDate:     null,
    plan:         { isLh: isLh, hasExperimentInfo: true },
    siteList:     [{}],
    buildingList: [{}],
    templateList: [],
    contentList:  [{ content: '' }],
    edit:         true,
    file:         {},
  } as unknown as ProjectSystemEstimateParameter;
};

export interface ProjectEstimatePlanParameter {
  estimateDate: string;
  expectedServiceDate: string;
  expectedTestDeadline: number;
  expectedFinalReportDeadline: number;
  testAmount: number;
  reviewAmount: number;
  discountAmount: number;
  totalAmount: number;
  manager1Id: UserId;
  manager2Id: UserId;
  isLh: boolean;
  hasExperimentInfo: boolean;
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
  rate?: number;
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
  titleList: ProjectEstimateTemplateDetailTitleListToMap[];
  unit: TestUnit;
  testCount: number;
  unitAmount: number;
  totalAmount: number;
  inUse: boolean;
  note?: string;
}

export interface ProjectEstimateContentListToMap {
  content: string;
}

export interface ProjectEstimateTemplateDetailTitleListToMap {
  title: string;
}

export interface ProjectFinalEstimateParameter {
  estimateDate?: string;
  resetEstimateDate?: boolean;
  code?: string;
  resetCode?: boolean;
  targetTest?: string;
  resetTargetTest?: boolean;
  testAmount?: number;
  resetTestAmount?: boolean;
  reviewAmount?: number;
  resetReviewAmount?: boolean;
  totalAmount?: number;
  resetTotalAmount?: boolean;
  type?: string;
  resetType?: boolean;
  businessId?: BusinessId;
  resetBusinessId?: boolean;
  writerId?: UserId;
  resetWriterId?: boolean;
  isSent?: boolean;
  resetIsSent?: boolean;
  note?: string;
  resetNote?: boolean;
  schedule?: string;
  resetSchedule?: boolean;
  sentDate?: string;
  resetSentDate?: boolean;
}
