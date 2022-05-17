import { ProjectStatus } from 'services/project/entity';

export const projectStatusList: ProjectStatus[] = [
  'ON_GOING',
  'TEMPLATE'
];
export const projectStatusName = (status: ProjectStatus): string => {
  if (status === 'ON_GOING') {
    return '진행중';
  }
  if (status === 'TEMPLATE') {
    return '가등록';
  }
  return '';
};


export const projectSpecialWindLoadConditionName = (condition: string): string => {
  if (condition === '1') {
    return '1) 풍진동의 영향을 고려해야 할 건축물';
  }
  if (condition === '2') {
    return '2) 특수한 지붕 골조';
  }
  if (condition === '3') {
    return '3) 골바람교화가 발생하는 건설지점';
  }
  if (condition === '4') {
    return '4) 인접효과가 우려되는 건축물';
  }
  if (condition === '5') {
    return '5) 비정형적 형상의 건축물';
  }
  return '';
};