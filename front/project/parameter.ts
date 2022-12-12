import { UserId } from 'user/domain';
import {
  ProjectBasicBidType,
  ProjectProgressStatus,
  ProjectStatus
} from 'project/domain';
import { pageSizeList } from 'type/Page';

export interface ProjectAddParameter {
  name: string;
  alias: string;
  receptionManagerId: UserId;
  progressStatus: ProjectProgressStatus;
  bidType: ProjectBasicBidType;
  memo?: string;
}

export interface ProjectUpdateParameter {
  isFavorite?: boolean;
}

export interface ProjectStatusParameter
  extends ProjectStatus {
}

export interface ProjectQuery {
  keyword: string;
  page: number;
  size: number;
}

export const initialProjectQuery: ProjectQuery = {
  keyword: '',
  page:    0,
  size:    pageSizeList[0]
};

export const memoLabelList: string[] = [
  '견적 의뢰처',
  '소개자',
  '총 동 수',
  '단지 수',
  '예상 시작 시점',
  '현재 인허가 단계',
  '관계사 정보',
  '견적 발송처',
  '기타 메모사항'
];
