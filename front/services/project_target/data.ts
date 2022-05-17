import { ProjectTargetReviewStatus } from 'services/project_target';

export const projectTargetReviewStatusList: ProjectTargetReviewStatus[] = [
  'DRAFT',
  'DRAFT_CONFIRMED',
  'SENT',
  'RECONSIDER',
  'RECONSIDER_CONFIRMED',
  'RECONSIDER_SENT',
  'COMPLETE'
];

export const projectTargetReviewStatusName = (status: ProjectTargetReviewStatus): string => {
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
    return '재검토';
  }
  if (status === 'RECONSIDER_CONFIRMED') {
    return '재검토확정';
  }
  if (status === 'RECONSIDER_SENT') {
    return '재검토전달';
  }
  if (status === 'COMPLETE') {
    return '완료';
  }
  return '';
};