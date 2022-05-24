import { ListUser } from 'services/user';
import { ProjectReview } from 'services/project_review';

export type ProjectEstimateSheetStatus = 'DRAFT'
  | 'DRAFT_CONFIRMED'
  | 'SENT'
  | 'RECONSIDER'
  | 'RECONSIDER_CONFIRMED'
  | 'RECONSIDER_SENT'
  | 'COMPLETE'
  ;

export type ProjectEstimate = {
  receivedDate?: Date;
  figureLevel?: string;
  testLevel?: string;
  reportLevel?: string;
  modifiedAt?: Date;
}


export type ProjectEstimateSheetComment = {
  seq: number;
  description: string;
  inUse: boolean;
}

export type ListProjectEstimateSheet = {
  id: number;
  confirmed: boolean;
  status: ProjectEstimateSheetStatus;
  title: string;
  memo?: string;
  writer: ListUser;
  createdAt: Date;
  modifiedAt?: Date;
}

export type ProjectEstimateSheetTestServiceDetail = {
  id: number;
  titleList: string[];
  unit: string;
  count: number;
  unitPrice: number;
  totalPrice: number;
  isIncluded: boolean;
  memo?: string;
}

export type ProjectEstimateSheetTestService = {
  id: number;
  title: string;
  detailList: ProjectEstimateSheetTestServiceDetail[];
}

export type ProjectEstimateSheet = {
  id: number;
  confirmed: boolean;
  status: ProjectEstimateSheetStatus;
  title: string;
  memo?: string;
  writer: ListUser;
  estimateDate: Date;
  expectedStartMonth?: Date;
  salesTeamLeader: ListUser;
  salesManagementLeader?: ListUser;
  engineeringPeriod?: number;
  finalReportPeriod?: number;
  review: ProjectReview;
  testServiceList: ProjectEstimateSheetTestService[];
  specialDiscount?: number;
  commentList: ProjectEstimateSheetComment[];
}
