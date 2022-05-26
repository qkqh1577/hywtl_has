import { UserShort } from 'services/user';

export type ProjectTargetDetail = {
  id: number;
  buildingName: string;
  testList: string[];
  memo?: string;
}

export type ProjectTargetShort = {
  id: number;
  confirmed: boolean;
  code: string;
  testList: string[];
  detailCount: number;
  writer: UserShort;
  memo?: string;
  createdAt: Date;
  modifiedAt?: Date;
}

export type ProjectTarget = {
  id: number;
  confirmed: boolean;
  code: string;
  testList?: string[];
  memo?: string;
  writer: UserShort;
  detailList: ProjectTargetDetail[];
}