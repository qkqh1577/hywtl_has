import { ProjectEstimateSheetStatus } from 'services/project_estimate';

export type ProjectEstimateParameter = {
  projectId: number;
  receivedDate?: string;
  figureLevel?: string;
  testLevel?: string;
  reportLevel?: string;
}

export type ProjectEstimateSheetCommentParameter = {
  seq: number;
  description: string;
  inUse: boolean;
}

export type ProjectEstimateSheetTestServiceDetailParameter = {
  id?: number;
  titleList: string[];
  seq: number;
  unit: string;
  count: number;
  unitPrice: number;
  totalPrice: number;
  isIncluded: boolean;
  memo?: string;
};

export type ProjectEstimateSheetTestServiceParameter = {
  id?: number;
  title: string;
  seq: number;
  detailList: ProjectEstimateSheetTestServiceDetailParameter[];
}

export type ProjectEstimateSheetAddParameter = {
  projectId: number;
  confirmed: boolean;
  status: ProjectEstimateSheetStatus;
  title: string;
  memo?: string;
  estimateDate: string;
  expectedStartMonth?: string;
  salesTeamLeaderId: number;
  salesManagementLeaderId?: number;
  engineeringPeriod?: number;
  finalReportPeriod?: number;
  reviewId: number;
  testServiceList: ProjectEstimateSheetTestServiceParameter[];
  specialDiscount?: number;
  commentList: ProjectEstimateSheetCommentParameter[];
}
