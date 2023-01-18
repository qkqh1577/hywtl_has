import {
  ProjectEstimateId,
  ProjectEstimateVO
} from 'project_estimate/domain';
import { ProjectContractId } from 'project_contract/domain';
import { FileItemParameter } from 'file-item';
import { BusinessId } from 'business/domain';
import { UserId } from 'user/domain';

export interface ProjectContractFinalParameter {
  idList: ProjectContractId[];
}

export const initialProjectContractFinalParameter = {} as ProjectContractFinalParameter;

export interface ProjectContractBasicParameter {
  serviceName: string;
  serviceDuration: string;
  outcome: string;
  description?: string;
  contractDate: string;
  ordererAddress: string;
  ordererCompanyName: string;
  ordererCeoName: string;
  contractorAddress: string;
  contractorCompanyName: string;
  contractorCeoName: string;
}

export const initialProjectContractBasicParameter = {} as ProjectContractBasicParameter;

export interface ProjectContractCollectionStageParameter {
  name: string;
  rate: number;
  amount: number;
  note?: string;
  expectedDate: string;
}

export interface ProjectContractCollectionParameter {
  stageNote: string;
  stageList: ProjectContractCollectionStageParameter[];
  totalAmountNote?: string;
  totalAmount: number;
}

export const initialProjectContractCollectionParameter = {
  stageList: []
} as unknown as ProjectContractCollectionParameter;

export interface ProjectContractConditionParameter {
  title: string;
  descriptionList: ProjectContractConditionDescriptionToMap[];
}

export interface ProjectContractConditionDescriptionToMap {
  description: string;
}

export const initialProjectContractConditionParameter = {
  descriptionList: [{ description: '' }]
} as ProjectContractConditionParameter;


export interface ProjectFinalContractParameter {
  contractDate?: string;
  resetContractDate?: boolean;
  contractType?: string;
  resetContractType?: boolean;
  code?: string;
  resetCode?: boolean;
  estimateCode?: string;
  resetEstimateCode?: boolean;
  targetTest?: string;
  resetTargetTest?: boolean;
  testAmount?: number;
  resetTestAmount?: boolean;
  reviewAmount?: number;
  resetReviewAmount?: boolean;
  totalAmount?: number;
  resetTotalAmount?: boolean;
  note?: string;
  resetNote?: boolean;
  schedule?: string;
  resetSchedule?: boolean;
  businessId?: BusinessId;
  resetBusinessId?: boolean;
  writerId?: UserId;
  resetWriterId?: boolean;
  isSent?: boolean;
  resetIsSent?: boolean;
}

export interface ProjectContractParameter {
  id?: ProjectContractId;
  estimateId: ProjectEstimateId;
  estimate: ProjectEstimateVO;
  isSent: boolean;
  contractType: string;
  recipient: string;
  note?: string;
  pdfFile?: FileItemParameter; // 최종 pdf 파일이 있는 경우만
  basic: ProjectContractBasicParameter;
  collection: ProjectContractCollectionParameter;
  conditionList: ProjectContractConditionParameter[];
  file: FileItemParameter;
}

export const initialProjectContractParameter = {
  basic:         initialProjectContractBasicParameter,
  collection:    initialProjectContractCollectionParameter,
  conditionList: [initialProjectContractConditionParameter],
  edit:          true,
  file:          {},
} as unknown as ProjectContractParameter;
