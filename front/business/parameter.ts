import {
  BusinessId,
  BusinessManagerId,
  BusinessManagerStatus,
  BusinessManagerVO,
  BusinessVO
} from 'business/domain';

export interface BusinessManagerParameter
  extends Omit<BusinessManagerVO, |'id'> {
  id?: BusinessManagerId;
}

export const initialBusinessManagerParameter = {
  status: BusinessManagerStatus.IN_OFFICE,
} as BusinessManagerParameter;

export interface BusinessParameter
  extends Omit<BusinessVO, |'id'> {
  id?: BusinessId;
}

export const initialBusinessParameter = {
  edit:        false,
  managerList: [initialBusinessManagerParameter]
} as unknown as BusinessParameter;
