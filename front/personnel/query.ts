import { Option } from 'components/DataFieldProps';

export interface PersonnelQuery {
  keyword?: string; //검색어
  keywordType: string; // 검색 필터 (이름 | 이메일 | 영문명 | 주소 | 연락처)
  sexList?: string[]; // 성별 (남 | 여)
  hiredTypeList: string[]; // 입사구분 (신입 | 경력)
  dateType: string; // date 타입 생년월일 / 입사일 / 학력시작일
  startDate: string; // 시작일
  endDate: string; // 종료일
  accountStateList: string[]; // 계정상태(초대 | 사용 | 중지)
  departmentList: string[]; // 소속 (한양풍동실험연구소, 기술본부, 기술팀, 영업팀, 모형팀, 기술부, 실험부, 편집부)
  sort: string;
  page: number; // 페이지 번호
  size: number;
}

export const initialPersonnelQuery: PersonnelQuery = {
  accountStateList: [],
  dateType:         '',
  departmentList:   [],
  endDate:          '',
  hiredTypeList:    [],
  keyword:          '',
  keywordType:      '',
  page:             0,
  sexList:          [],
  size:             0,
  sort:             '',
  startDate:        ''
};


export const keywordTypeList: Option[] = [
  {
    key:  'by_name',
    text: '이름'
  },
  {
    key:  'by_email',
    text: '이메일'
  },
  {
    key:  'by_engName',
    text: '영문명'
  },
  {
    key:  'by_address',
    text: '주소'
  },
  {
    key:  'by_phone',
    text: '연락처'
  }
];

export const dateTypeList: Option[] = [
  {
    key:  'by_birthDate',
    text: '생년월일'
  },
  {
    key:  'by_hiredDate',
    text: '입사일',

  },
  {
    key:  'by_academicStartDate',
    text: '학력 시작일',
  }
];

export const sexTypeList: Option[] = [
  {
    key:  'MALE',
    text: '남',
  },
  {
    key:  'FEMALE',
    text: '여',
  }
];

export const hiredTypeList: Option[] = [
  {
    key:  'NEWCOMER',
    text: '신입'
  },
  {
    key:  'EXPERIENCE',
    text: '경력'
  },
];

export const accountStateTypeList: Option[] = [
  {
    key:  'INVITATION',
    text: '초대'
  },
  {
    key:  'USE',
    text: '사용'
  },
  {
    key:  'STOP',
    text: '중지'
  },
];

export const jobTypeList: Option[] = [
  {
    key:  'HANYANG_LAB',
    text: '한양풍동실험연구소'
  },
  {
    key:  'TECHNIQUE_CENTER',
    text: '기술본부'
  },
  {
    key:  'TECHNIQUE_TEAM',
    text: '기술팀'
  },
  {
    key:  'SALES_TEAM',
    text: '영업팀'
  },
  {
    key:  'MODEL_TEAM',
    text: '모델팀'
  },
  {
    key:  'TECHNIQUE_DEPARTMENT',
    text: '기술부'
  },
  {
    key:  'TEST_DEPARTMENT',
    text: '실험부'
  },
  {
    key:  'EDITING_DEPARTMENT',
    text: '편집부'
  },
];
