import { BusinessVO } from 'business/domain';

export interface ProjectBidVO {
  beginDate?: Date;
  closeDate?: Date;
  win?: BusinessVO;
  bidOrganization?: string;
  bidDate?: Date;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
  modifiedAt?: Date;
}