import { ListUser } from 'services/user';
import { ProjectTargetReview } from 'services/project_target';

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

export type ProjectEstimateSheetDetail = {
  id: number;
  title: string;
  subTitleList: string[];
  seq: number;
  unit: string;
  count: number;
  unitPrice: number;
  totalPrice: number;
  isIncluded: boolean;
  memo?: string;
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
  review: ProjectTargetReview;
  detailList: ProjectEstimateSheetDetail[];
  specialDiscount?: number;
  commentList: ProjectEstimateSheetComment[];
}