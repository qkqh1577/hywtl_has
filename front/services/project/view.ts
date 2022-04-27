import { ProjectStatus } from 'services/project/entity';
// TODO: 주소 컴포넌트 개발 이후 변경
// import Address from 'services/common/address/entity';

export const projectStatusName = (status: ProjectStatus): string => {
  if (status === 'ON_GOING') {
    return '진행중';
  }
  if (status === 'TEMPLATE') {
    return '가등록';
  }
  return '';
};
export type ProjectFilterView = {
  page: number;
  size: number;
  keyword: string;
}

export type ProjectBasicView = {
  name: string;
  code: string;
  alias: string;
  salesManagerId: number | '';
  projectManagerId: number | '';
}

export type ProjectBuildingView = {
  // TODO: 주소 컴포넌트 개발 이후 변경
  // address: Address | null;
  address: string;
  purpose1: string;
  purpose2: string;
  lotArea: number | '';
  totalArea: number | '';
  buildingCount: number | '';
  householdCount: number | '';
  floorCount: number | '';
  baseCount: number | '';
}

export const initProjectFilter: ProjectFilterView = {
  page: 0,
  size: 10,
  keyword: '',
};

export const initProjectBasic: ProjectBasicView = {
  name: '',
  code: '',
  alias: '',
  salesManagerId: '',
  projectManagerId: '',
};

export const initProjectBuilding: ProjectBuildingView = {
  address: '',
  purpose1: '',
  purpose2: '',
  lotArea: '',
  totalArea: '',
  buildingCount: '',
  householdCount: '',
  floorCount: '',
  baseCount: ''
};
