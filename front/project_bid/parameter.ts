import { BusinessId, } from 'business/domain';

export interface ProjectBidParameter {
  beginDate?: Date;
  closeDate?: Date;
  winId?: BusinessId;
  bidOrganization?: string;
  bidDate?: Date;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
}