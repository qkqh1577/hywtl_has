import FileItemParameter from 'services/common/file-item/parameter';
import { ProjectTargetReviewStatus } from 'services/project/entity';

export type ProjectQuery = {
  size: number;
  page: number;
  keyword?: string;
}

export type ProjectBasicParameter = {
  name: string;
  code: string;
  alias?: string;
  salesManagerId: number;
  projectManagerId: number;
  address?: string;
  purpose1?: string;
  purpose2?: string;
  lotArea?: number;
  totalArea?: number;
  buildingCount?: number;
  householdCount?: number;
  floorCount?: number;
  baseCount?: number;
  clientName?: string;
  isClientLH?: boolean;
  clientManager?: string;
  clientPhone?: string;
  clientEmail?: string;
}

export type ProjectOrderParameter = {
  amount?: number;
  receivedDate?: string;
  beginDate?: string;
  closeDate?: string;
  isOnGoing?: boolean;
}

export type ProjectTargetDocumentAddParameter = {
  fileItem: FileItemParameter;
  memo?: string;
}

export type ProjectTargetDocumentChangeParameter = {
  memo?: string;
}
export type ProjectTargetReviewDetailAddParameter = {
  buildingName: string;
  floorCount: number;
  baseCount?: number;
  height: number;
  area: number;
  specialWindLoadConditionList: string[];
  testList: string[];
  memo1?: string;
  memo2?: string;
}

export type ProjectTargetReviewAddParameter = {
  title: string;
  confirmed: boolean;
  status: ProjectTargetReviewStatus;
  memo?: string;
  detailList: ProjectTargetReviewDetailAddParameter[];
}

export type ProjectTargetParameter = {
  landModelCount?: number;
}
