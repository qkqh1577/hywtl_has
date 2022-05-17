import { ListUser } from 'services/user';
import { ProjectTarget } from 'services/project_target';

export type ProjectStatus = 'ON_GOING' | 'TEMPLATE';

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
  modifiedAt: Date;
}

export type ProjectOrder = {
  amount?: number;
  receivedDate?: Date;
  beginDate?: Date;
  closeDate?: Date;
  isOnGoing?: boolean;
  modifiedAt?: Date;
}

export type Project = {
  id: number;
  basic: ProjectBasic;
  order?: ProjectOrder;
  target?: ProjectTarget;
}


