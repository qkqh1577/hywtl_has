import {DepartmentCategory} from "./entity";

export const departmentCategoryList: DepartmentCategory[] = [
  'COMPANY',
  'HQ',
  'TEAM',
  'PART',
  'PERSON',
  'EXTRA'
];

export const departmentCategoryName = (category: DepartmentCategory): string => {
  if (category === 'COMPANY') {
    return '회사';
  }
  if (category === 'HQ') {
    return '본부';
  }
  if (category === 'TEAM') {
    return '팀';
  }
  if (category === 'PART') {
    return '부';
  }
  if (category === 'PERSON') {
    return '개인';
  }
  if (category === 'EXTRA') {
    return '기타';
  }
  return '-';
};