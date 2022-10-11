import { BusinessId, } from 'business/domain';

export interface ProjectBidParameter {
  beginDate?: string;
  closeDate?: string;
  winId?: BusinessId;
  bidOrganization?: string;
  bidDate?: string;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
}