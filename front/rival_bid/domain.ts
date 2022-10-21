import { BidVO } from 'type/Bid';
import { BusinessVO } from 'business/domain';

export type RivalBidId = number & { readonly _brand: unique symbol; };

export function RivalBidId(id: number) {
  return id as RivalBidId;
}

export interface RivalBidVO
  extends BidVO {
  id: RivalBidId;
  business: BusinessVO;
  modifiedAt?: Date;
}