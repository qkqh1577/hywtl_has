// TODO: 주소 컴포넌트 개발 이후 변경
// import { AddressParameter } from 'services/common/address/parameter';

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
}

export type ProjectBuildingParameter = {
  // TODO: 주소 컴포넌트 개발 이후 변경
  // address: AddressParameter;
  address: string;
  purpose1?: string;
  purpose2?: string;
  lotArea?: number;
  totalArea?: number;
  buildingCount?: number;
  householdCount?: number;
  floorCount?: number;
  baseCount?: number;
}
