import { ProjectEstimateId } from 'project_contract/domain';

export interface ProjectContractParameter {
  estimateId: ProjectEstimateId;
  isSent: boolean;
  recipient: string;
  note?: string;
  pdfFile?: string; // 최종 pdf 파일이 있는 경우만
  basic?: {
    serviceName: string; // 용역명
    serviceDuration: string; // 용역 기간
    outcome: string; // 성과품
    description?: string; // 추가 사항
    contractDate: Date; // 계약 날짜
    ordererAddress: string; // 발주자 소재
    ordererCompanyName: string; // 발주자 상호
    ordererCeoName: string; // 발주자 대표명
    contractorAddress: string; // 수급자 소재
    contractorCompanyName: string; // 수급자 상호
    contractorCeoName: string; // 수급자 대표명
  };
  collection?: {
    stageNote: string;
    stageList: {
      name: string;
      ratio: number;
      amount: number;
      note?: string;
      expectedDate: Date;
    }[],
    totalAmountNote?: string;
    totalAmount: number;
  };
  conditionList?: {
    title: string;
    descriptionList: string[];
  }[];
}

export interface ProjectContractAddParameter {
  estimateId: ProjectEstimateId;
  isSent: boolean;
  recipient: string;
  note?: string;
  pdfFile?: string; // 최종 pdf 파일이 있는 경우만
  basic?: {
    serviceName: string; // 용역명
    serviceDuration: string; // 용역 기간
    outcome: string; // 성과품
    description?: string; // 추가 사항
    contractDate: Date; // 계약 날짜
    ordererAddress: string; // 발주자 소재
    ordererCompanyName: string; // 발주자 상호
    ordererCeoName: string; // 발주자 대표명
    contractorAddress: string; // 수급자 소재
    contractorCompanyName: string; // 수급자 상호
    contractorCeoName: string; // 수급자 대표명
  };

  collection?: {
    stageNote: string;
    stageList: {
      name: string;
      ratio: number;
      amount: number;
      note?: string;
      expectedDate: Date;
    }[],
    totalAmountNote?: string;
    totalAmount: number;
  };
  conditionList?: {
    title: string;
    descriptionList: string[];
  }[];
}