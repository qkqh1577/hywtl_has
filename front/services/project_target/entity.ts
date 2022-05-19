import { ListUser } from 'services/user';

export type ProjectTargetDetail = {
  id: number;
  buildingName: string;
  testList: string[];
  memo?: string;
}

export type ListProjectTarget = {
  id: number;
  confirmed: boolean;
  code: string;
  testList: string[];
  detailCount: number;
  writer: ListUser;
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
  writer: ListUser;
  detailList: ProjectTargetDetail[];
}