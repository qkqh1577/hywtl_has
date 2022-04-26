import { ProjectStatus } from 'services/project/entity';
import { AddressParameter } from 'services/common/address/parameter';

export type ProjectQuery = {
  size: number;
  page: number;
  keyword?: string;
}

export type ProjectBasicParameter = {
  name: string;
  alias?: string;
  status: ProjectStatus;
  salesManagerId: number;
  projectManagerId: number;
}

export type ProjectBuildingParameter = {
  address: AddressParameter;
  purpose1?: string;
  purpose2?: string;
  lotArea?: number;
  totalArea?: number;
  buildingCount?: number;
  householdCount?: number;
  floorCount?: number;
  baseCount?: number;
}

export type ProjectAddParameter = ProjectBasicParameter & {
  code: string;
}
