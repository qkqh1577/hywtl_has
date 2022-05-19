export type ProjectTargetDetailParameter = {
  id?: number;
  buildingName: string;
  testList: string[];
  memo?: string;
}

export type ProjectTargetParameter = {
  code: string;
  testList?: string[];
  memo?: string;
  detailList: ProjectTargetDetailParameter[];
}

