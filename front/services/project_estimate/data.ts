import { ProjectEstimateSheetStatus } from 'services/project_estimate';

export const projectEstimateSheetStatusName = (status: ProjectEstimateSheetStatus): string => {
  if (status === 'DRAFT') {
    return '초안';
  }
  if (status === 'DRAFT_CONFIRMED') {
    return '초안확정';
  }
  if (status === 'SENT') {
    return '전달';
  }
  if (status === 'RECONSIDER') {
    return '재견적';
  }
  if (status === 'RECONSIDER_CONFIRMED') {
    return '재견적확정';
  }
  if (status === 'RECONSIDER_SENT') {
    return '재견적전달';
  }
  if (status === 'COMPLETE') {
    return '완료';
  }
  return '-';
};

export const projectEstimateSheetStatusList: ProjectEstimateSheetStatus[] = [
  'DRAFT',
  'DRAFT_CONFIRMED',
  'SENT',
  'RECONSIDER',
  'RECONSIDER_CONFIRMED',
  'RECONSIDER_SENT',
  'COMPLETE',
];