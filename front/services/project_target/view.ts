
export type ProjectTargetDetailView = {
  id?: number;
  buildingName: string;
  testList: string[];
  memo: string;
}

export type ProjectTargetView = {
  confirmed: 'Y' | 'N';
  code: string;
  testList: string[];
  memo: string;
  detailList: ProjectTargetDetailView[];
}

export const initProjectTargetDetailView: ProjectTargetDetailView = {
  buildingName: '',
  testList: [],
  memo: ''
};

export const initProjectTargetView: ProjectTargetView = {
  confirmed: 'N',
  code: '',
  testList: [],
  memo: '',
  detailList: [initProjectTargetDetailView]
};
