import { ProjectEstimateSheetStatus } from 'services/project_estimate/entity';

export type ProjectEstimateParameter = {
  projectId: number;
  receivedDate?: string;
  figureLevel?: string;
  testLevel?: string;
  reportLevel?: string;
}

export type ProjectEstimateSheetDetailParameter = {
  title: string;
  subTitleList: string[];
  seq: number;
  unit: string;
  count: number;
  unitPrice: number;
  totalPrice: number;
  isIncluded: boolean;
  memo?: string;
};

export type ProjectEstimateSheetCommentParameter = {
  seq: number;
  description: string;
  inUse: boolean;
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
  reviewId: number;
  detailList: ProjectEstimateSheetDetailParameter[];
  specialDiscount?: number;
  commentList: ProjectEstimateSheetCommentParameter[];
}
