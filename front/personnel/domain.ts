import { FileItemView } from 'file-item';

export type PersonnelId = number & { readonly _brand: symbol }

export function PersonnelId(id: number) {
  return id as PersonnelId;
}

export interface PersonnelVO {
  id: PersonnelId,
  basic: PersonnelBasicVO,
  company: PersonnelCompanyVO,
  job: PersonnelJobVO[],
  academy: PersonnelAcademicVO[],
  career: PersonnelCareerVO[],
  license: PersonnelLicenseVO[],
  language: PersonnelLanguageVO[],
}

export interface PersonnelBasicVO {
  engName: string; // 영문이름
  birthDate: Date; // 생년월일(yyyy-mm-dd)
  sex: string; // 성별
  image: FileItemView; //
  address: string; // 주소
  phone: string; // 핸드폰
  emergencyPhone: string; // 비상연락처
  relationship: string; // 비상연락처 사원과의 관계
  personalEmail: string; // 개인이메일
}

export interface PersonnelCompanyVO {
  hiredDate: Date; // 입사일
  hiredType: string; // 입사구분
  recommender: string; // 추천자
}

export interface PersonnelJobVO {
  departmentId?: number; // 부서
  jobTitle?: string; // 직함
  jobType?: string; // 직종
  jobPosition?: string; // 직위
  jobClass?: string; // 직급
  jobDuty?: string; // 직책
}

export interface PersonnelAcademicVO {
  academyName?: string; // 교육기관명
  major?: string; // 전공
  degree?: string; // 학위
  state?: string; // 재적 상태
  grade?: string; // 학점
  startDate?: Date; // 입학일
  endDate?: Date; // 졸업일
}

export interface PersonnelCareerVO {
  companyName?: string; // 근무처명
  majorJob?: string; // 직급 및 담당업무
  startDate?: Date; // 입사일
  endDate?: Date; // 퇴사일
}

export interface PersonnelLicenseVO {
  name?: string; // 면허 이름(정보)
  type?: string; // 종별
  organizationName?: string; // 발급기관명
  qualifiedNumber?: string; // 승인번호
  qualifiedDate?: Date; // 승인일자
  note?: string; // 비고
}

export interface PersonnelLanguageVO {
  name?: string; // 자격증명
  type?: string; // 대상 언어
  grade?: string; // 급수, 종류
  organizationName?: string; // 발급기관명
  certifiedDate?: Date; // 취득일
  expiryPeriod?: string; // 유효기관(종료일)
  trainingPeriod?: string; // 연수기간?? 서버에는 있는 내용이어서 넣음.
}

export enum SexCategory {
  MALE   = 'MALE',
  FEMALE = 'FEMALE',
}

export const sexCategoryList: SexCategory[] = [
  SexCategory.MALE,
  SexCategory.FEMALE
];

export function sexCategoryName(sexName: SexCategory | '') {
  switch (sexName) {
    case SexCategory.MALE:
      return '남성';
    case SexCategory.FEMALE:
      return '여성';
    default:
      return '-';
  }
}

export enum HiredTypeCategory {
  NEWCOMER   = 'NEWCOMER',
  EXPERIENCE = 'EXPERIENCE',
}

export const hiredTypeList: HiredTypeCategory[] = [
  HiredTypeCategory.NEWCOMER,
  HiredTypeCategory.EXPERIENCE
];

export function hiredTypeName(hiredTypeName: HiredTypeCategory | '') {
  switch (hiredTypeName) {
    case HiredTypeCategory.NEWCOMER:
      return '신입';
    case HiredTypeCategory.EXPERIENCE:
      return '경력';
    default:
      return '-';
  }
}

export enum JobCategory {
  HANYANG_LAB          = 'HANYANG_LAB',
  TECHNIQUE_CENTER     = 'TECHNIQUE_CENTER',
  TECHNIQUE_TEAM       = 'TECHNIQUE_TEAN',
  SALES_TEAM           = 'SALES_TEAN',
  MODEL_TEAM           = 'MODEL_TEAM',
  TECHNIQUE_DEPARTMENT = 'TECHNIQUE_DEPARTMENT',
  TEST_DEPARTMENT      = 'TEST_DEPARTMENT',
  EDITING_DEPARTMENT   = 'EDITING_DEPARTMENT',
}

export const jobCategoryList: JobCategory[] = [
  JobCategory.HANYANG_LAB,
  JobCategory.TECHNIQUE_CENTER,
  JobCategory.TECHNIQUE_TEAM,
  JobCategory.SALES_TEAM,
  JobCategory.MODEL_TEAM,
  JobCategory.TECHNIQUE_DEPARTMENT,
  JobCategory.TEST_DEPARTMENT,
  JobCategory.EDITING_DEPARTMENT,
];

export function jobCategoryName(jobName: JobCategory | '') {
  switch (jobName) {
    case JobCategory.HANYANG_LAB:
      return '한양풍동실험연구소';
    case JobCategory.TECHNIQUE_CENTER:
      return '기술본부';
    case JobCategory.TECHNIQUE_TEAM:
      return '기술팀';
    case JobCategory.SALES_TEAM:
      return '영업팀';
    case JobCategory.MODEL_TEAM:
      return '모형팀';
    case JobCategory.TECHNIQUE_DEPARTMENT:
      return '기술부';
    case JobCategory.TEST_DEPARTMENT:
      return '실험부';
    case JobCategory.EDITING_DEPARTMENT:
      return '편집부';
    default:
      return '-';
  }
}
