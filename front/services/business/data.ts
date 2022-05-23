import { BusinessManagerStatus } from 'services/business/entity';

export const businessManagerStatusList: BusinessManagerStatus[] = [
  'IN_OFFICE',
  'RESIGNATION',
  'LEAVE',
];

export const businessManagerStatusName = (status: BusinessManagerStatus): string => {
  if (status === 'IN_OFFICE') {
    return '재직';
  }
  if (status === 'RESIGNATION') {
    return '퇴직';
  }
  if (status === 'LEAVE') {
    return '휴직';
  }
  return '-';
};