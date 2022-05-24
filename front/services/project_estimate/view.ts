import { ProjectEstimateSheetStatus } from 'services/project_estimate';

export type ProjectEstimateView = {
  receivedDate: Date | null;
  figureLevel: string;
  testLevel: string;
  reportLevel: string;
}

export type ProjectEstimateSheetCommentView = {
  description: string;
  inUse: boolean;
}

export type ProjectEstimateSheetTestServiceDetailView = {
  id?: number;
  titleList: string[];
  unit: string;
  count: number | '';
  unitPrice: number | '';
  isIncluded: 'Y' | 'N' | '';
  memo: string;
}


export type ProjectEstimateSheetTestServiceView = {
  id?: number;
  title: string;
  detailList: ProjectEstimateSheetTestServiceDetailView[];
}

export type ProjectEstimateSheetView = {
  confirmed: 'Y' | 'N' | '';
  status: ProjectEstimateSheetStatus | '';
  title: string;
  memo: string;
  estimateDate: Date | null;
  expectedStartMonth: Date | null;
  salesTeamLeaderId: number | '';
  salesManagementLeaderId: number | '';
  engineeringPeriod: number | '';
  finalReportPeriod: number | '';
  reviewId: number | '';
  specialDiscount: number | '';
}

export const initProjectEstimateView: ProjectEstimateView = {
  receivedDate: null,
  figureLevel: '',
  testLevel: '',
  reportLevel: '',
};

export const initProjectEstimateSheetView: ProjectEstimateSheetView = {
  confirmed: '',
  status: '',
  title: '',
  memo: '',
  estimateDate: null,
  expectedStartMonth: null,
  salesTeamLeaderId: '',
  salesManagementLeaderId: '',
  engineeringPeriod: '',
  finalReportPeriod: '',
  reviewId: '',
  specialDiscount: '',
};
