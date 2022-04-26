import { ListUser } from 'services/user/entity';
import Address from 'services/common/address/entity';

export type ProjectStatus = '가등록' | '진행';

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
}

export type ProjectBuilding = {
  address: Address;
  purpose1?: string;
  purpose2?: string;
  lotArea?: number;
  totalArea?: number;
  buildingCount?: number;
  householdCount?: number;
  floorCount?: number;
  baseCount?: number;
}

type Project = {
  id: number;
  basic: ProjectBasic;
  building?: ProjectBuilding;
}

export default Project;


