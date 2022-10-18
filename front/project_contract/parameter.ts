import { ProjectEstimateId } from 'project_estimate/domain';
import { ProjectContractId } from 'project_contract/domain';
import { FileItemParameter } from 'file-item';

export interface ProjectContractFinalParameter {
  id: ProjectContractId;
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
  ratio: number;
  amount: number;
  note?: string;
  expectedDate: string;
}

export const initialProjectContractCollectionStageParameter = {} as ProjectContractCollectionStageParameter;

export interface ProjectContractCollectionParameter {
  stageNote: string;
  stageList: ProjectContractCollectionStageParameter[];
  totalAmountNote?: string;
  totalAmount: number;
}

export const initialProjectContractCollectionParameter = {
  stageList: [initialProjectContractCollectionStageParameter]
} as ProjectContractCollectionParameter;

export interface ProjectContractConditionParameter {
  title: string;
  descriptionList: string[];
}

export const initialProjectContractConditionParameter = {
  descriptionList: ['']
} as ProjectContractConditionParameter;

export interface ProjectContractParameter {
  id?: ProjectContractId;
  estimateId: ProjectEstimateId;
  isSent: boolean;
  recipient: string;
  note?: string;
  pdfFile?: FileItemParameter; // 최종 pdf 파일이 있는 경우만
  basic: ProjectContractBasicParameter;
  collection: ProjectContractCollectionParameter;
  conditionList: ProjectContractConditionParameter[];
}

export const initialProjectContractParameter = {
  basic:         initialProjectContractBasicParameter,
  collection:    initialProjectContractCollectionParameter,
  conditionList: [initialProjectContractConditionParameter],
  edit:          true,
} as unknown as ProjectContractParameter;