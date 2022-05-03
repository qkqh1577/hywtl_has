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

export type ProjectTargetReviewAddParameter = {
  title: string;
  memo?: string;
}

export type ProjectTargetParameter = {
  landModelCount?: number;
}
