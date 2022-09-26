import { Option } from 'components/DataFieldProps';
import { pageSizeList } from 'type/Page';

export interface PersonnelQuery {
  sex?: string[]; // 성별 (남 | 여)
  hiredType?: string[]; // 입사구분 (신입 | 경력)
  status?: string[]; // 계정상태(초대 | 사용 | 중지)
  keyword?: string; //검색어
  keywordType: string; // 검색 필터 (이름 | 이메일 | 영문명 | 주소 | 연락처)
  dateType: string; // date 타입 생년월일 / 입사일 / 학력시작일
  startDate: string; // 시작일
  endDate: string; // 종료일
  departmentId?: string[]; // 소속 (한양풍동실험연구소, 기술본부, 기술팀, 영업팀, 모형팀, 기술부, 실험부, 편집부)
  sort: string;
  page: number;
  size: number;
}

export const keywordTypeList: Option[] = [
  {
    key:  '이름',
    text: '이름'
  },
  {
    key:  '이메일',
    text: '이메일'
  },
  {
    key:  '영문명',
    text: '영문명'
  },
  {
    key:  '주소',
    text: '주소'
  },
  {
    key:  '연락처',
    text: '연락처'
  }
];

export const dateTypeList: Option[] = [
  {
    key:  '생년월일',
    text: '생년월일'
  },
  {
    key:  '입사일',
    text: '입사일',

  },
  {
    key:  '학력 시작일',
    text: '학력 시작일',
  }
];

export const sexTypeList: Option[] = [
  {
    key:  '남성',
    text: '남',
  },
  {
    key:  '여성',
    text: '여',
  }
];

export const hiredTypeList: Option[] = [
  {
    key:  '신입',
    text: '신입'
  },
  {
    key:  '경력',
    text: '경력'
  },
];

export const accountStateTypeList: Option[] = [
  // {
  //   key:  '초대',
  //   text: '초대'
  // },
  {
    key:  '사용',
    text: '사용'
  },
  {
    key:  '사용 중지',
    text: '사용 중지'
  },
];

export const initialPersonnelQuery: PersonnelQuery = {
  keyword:      '',
  keywordType:  keywordTypeList[0].key as string,
  dateType:     dateTypeList[0].key as string,
  startDate:    '',
  endDate:      '',
  sort:         'id,desc',
  page:         0,
  size:         pageSizeList[0],
};
