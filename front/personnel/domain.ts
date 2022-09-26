import { FileItemView } from 'file-item';
import { UserId, } from 'user/domain';
import { DepartmentVO } from 'department/domain';

export type PersonnelId = number & { readonly _brand: symbol }

export function PersonnelId(id: number) {
  return id as PersonnelId;
}

export interface PersonnelShortVO {
  id?: PersonnelId,
  userId?: UserId,
  name: string,
  email: string,
  basic?: PersonnelBasicVO,
  company?: PersonnelCompanyVO,
  department?: DepartmentVO,
  job?: PersonnelJobVO,
  userStatus: string
}

export interface PersonnelBasicVO {
  engName: string; // 영문이름
  birthDate: Date | undefined; // 생년월일(yyyy-mm-dd)
  sex: string; // 성별
  image?: FileItemView; //
  address: string; // 주소
  phone: string; // 핸드폰
  emergencyPhone: string; // 비상연락처
  relationship: string; // 비상연락처 사원과의 관계
  personalEmail: string; // 개인이메일
}

export const initialPersonnelBasic: PersonnelBasicVO = {
  engName:        '',
  birthDate:      undefined,
  sex:            '',
  image:          undefined,
  address:        '',
  phone:          '',
  emergencyPhone: '',
  relationship:   '',
  personalEmail:  '',
};

export interface PersonnelCompanyVO {
  hiredDate: Date | undefined; // 입사일
  hiredType: string; // 입사구분
  recommender: string; // 추천자
}

export const initialPersonnelCompany: PersonnelCompanyVO = {
  hiredDate:   undefined,
  hiredType:   '',
  recommender: '',
};

export interface PersonnelJobVO {
  isRepresentative?: boolean; // 대표소속정보
  department?: DepartmentVO; // 부서
  jobTitle?: string; // 직함
  jobType?: string; // 직종
  jobPosition?: string; // 직위
  jobClass?: string; // 직급
  jobDuty?: string; // 직책
}

export const initialPersonnelJobVO: PersonnelJobVO = {
  isRepresentative: false,
  department:       undefined,
  jobTitle:         '',
  jobType:          '',
  jobPosition:      '',
  jobClass:         '',
  jobDuty:          '',
};

export interface PersonnelAcademicVO {
  academyName?: string; // 교육기관명
  major?: string; // 전공
  degree?: string; // 학위
  state?: string; // 재적 상태
  grade?: string; // 학점
  startDate?: Date; // 입학일
  endDate?: Date; // 졸업일
}

export const initialPersonnelAcademicVO: PersonnelAcademicVO = {
  academyName: '',
  major:       '',
  degree:      '',
  state:       '',
  grade:       '',
  startDate:   undefined,
  endDate:     undefined,
};

export interface PersonnelCareerVO {
  companyName?: string; // 근무처명
  majorJob?: string; // 직급 및 담당업무
  startDate?: Date; // 입사일
  endDate?: Date; // 퇴사일
}

export const initialPersonnelCareerVO: PersonnelCareerVO = {
  companyName: '',
  majorJob:    '',
  startDate:   undefined,
  endDate:     undefined,
};

export interface PersonnelLicenseVO {
  name?: string; // 면허 이름(정보)
  type?: string; // 종별
  organizationName?: string; // 발급기관명
  qualifiedNumber?: string; // 승인번호
  qualifiedDate?: Date; // 승인일자
  note?: string; // 비고
}

export const initialPersonnelLicenseVO: PersonnelLicenseVO = {
  name:             '',
  type:             '',
  organizationName: '',
  qualifiedNumber:  '',
  qualifiedDate:    undefined,
  note:             '',
};

export interface PersonnelLanguageVO {
  name?: string; // 자격증명
  type?: string; // 대상 언어
  grade?: string; // 급수, 종류
  organizationName?: string; // 발급기관명
  certifiedDate?: Date; // 취득일
  expiryPeriod?: Date; // 유효기관(종료일)
}

export const initialPersonnelLanguageVO: PersonnelLanguageVO = {
  name:             '',
  type:             '',
  grade:            '',
  organizationName: '',
  certifiedDate:    undefined,
  expiryPeriod:     undefined
};

export interface PersonnelVO {
  id?: PersonnelId,
  name: string,
  userStatus: string,
  email: string,
  basic: PersonnelBasicVO | undefined,
  company: PersonnelCompanyVO | undefined,
  jobList: PersonnelJobVO[],
  academicList: PersonnelAcademicVO[],
  careerList: PersonnelCareerVO[],
  licenseList: PersonnelLicenseVO[],
  languageList: PersonnelLanguageVO[],
}

export const initialPersonnelVO: PersonnelVO = {
  id:           undefined,
  name:         '',
  userStatus:   '',
  email:        '',
  basic:        initialPersonnelBasic,
  company:      initialPersonnelCompany,
  jobList:      [],
  academicList: [],
  careerList:   [],
  licenseList:  [],
  languageList: [],
};

export enum SexCategory {
  MALE   = '남성',
  FEMALE = '여성',
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
  NEWCOMER   = '신입',
  EXPERIENCE = '경력',
}

export const hiredTypeList: HiredTypeCategory[] = [
  HiredTypeCategory.NEWCOMER,
  HiredTypeCategory.EXPERIENCE
];
