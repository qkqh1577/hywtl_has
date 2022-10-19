import { RivalBidId } from 'rival_bid/domain';
import { BusinessId } from 'business/domain';
import { BidVO } from 'type/Bid';

export interface RivalBidParameter
  extends Partial<BidVO> {
  id: RivalBidId;
  businessId?: BusinessId;
}