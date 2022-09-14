import { RivalEstimateId } from 'rival_estimate/domain';
import { BusinessId } from 'business/domain';

export interface RivalEstimateParameter {
  id: RivalEstimateId;
  businessId?: BusinessId;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
}