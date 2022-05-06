import { ListUser } from 'services/user/entity';
import FileItem from 'services/common/file-item/entity';

export type ProjectStatus = 'ON_GOING' | 'TEMPLATE';

export type ProjectTargetReviewStatus =
  'DRAFT'
  | 'DRAFT_CONFIRMED'
  | 'SENT'
  | 'RECONSIDER'
  | 'RECONSIDER_CONFIRMED'
  | 'RECONSIDER_SENT'
  | 'COMPLETE'
  ;

export type ListProject = {
  id: number;
  name: string;
  code: string;
  status: ProjectStatus;
}

export type ProjectBasic = {
  code: string;
  name: string;
  alias?: string;
  status: ProjectStatus;
  salesManager: ListUser;
  projectManager: ListUser;
  // TODO: 주소 컴포넌트 개발 이후 변경
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
  updatedTime: Date;
}

export type ProjectOrder = {
  amount?: number;
  receivedDate?: Date;
  beginDate?: Date;
  closeDate?: Date;
  isOnGoing?: boolean;
  updatedTime?: Date;
}
export type ProjectTargetDocument = {
  id: number;
  fileItem: FileItem;
  writer: ListUser;
  memo?: string;
  createdTime: Date;
  updatedTime?: Date;
}
export type ListProjectTargetReview = {
  id: number;
  status: ProjectTargetReviewStatus;
  confirmed: boolean;
  title: string;
  memo?: string;
  writer: ListUser;
  createdTime: Date;
  updatedTime?: Date;
}

export type ProjectTargetReviewDetail = {
  buildingName: string;
  floorCount: number;
  baseCount?: number;
  height: number;
  area: number;
  ratio: number;
  specialWindLoadConditionList?: string[];
  testList: string[];
  memo1?: string;
  memo2?: string;
}

export type ProjectTargetReview = ListProjectTargetReview & {
  detailList: ProjectTargetReviewDetail[];
}

export type ProjectTarget = {
  landModelCount?: number;
  updatedTime?: Date;
}

type Project = {
  id: number;
  basic: ProjectBasic;
  order?: ProjectOrder;
  target?: ProjectTarget;
}

export default Project;


