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
  address: string;
  purpose1: string;
  purpose2: string;
  lotArea: number | '';
  totalArea: number | '';
  buildingCount: number | '';
  householdCount: number | '';
  floorCount: number | '';
  baseCount: number | '';
  clientName: string;
  isClientLH: string;
  clientManager: string;
  clientPhone: string;
  clientEmail: string;
}

export type ProjectOrderView = {
  amount: number | '';
  receivedDate: Date | null;
  beginDate: Date | null;
  closeDate: Date | null;
  isOnGoing: string;
}

export const initProjectFilterView: ProjectFilterView = {
  page: 0,
  size: 10,
  keyword: '',
};

export const initProjectBasicView: ProjectBasicView = {
  name: '',
  code: '',
  alias: '',
  salesManagerId: '',
  projectManagerId: '',
  address: '',
  purpose1: '',
  purpose2: '',
  lotArea: '',
  totalArea: '',
  buildingCount: '',
  householdCount: '',
  floorCount: '',
  baseCount: '',
  clientName: '',
  isClientLH: '',
  clientManager: '',
  clientPhone: '',
  clientEmail: '',
};

export const initProjectOrderView: ProjectOrderView = {
  amount: '',
  receivedDate: null,
  beginDate: null,
  closeDate: null,
  isOnGoing: '',
};


