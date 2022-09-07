import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId
} from 'business/domain';

export interface ProjectBasicBusinessParameter {
  businessId: BusinessId;
  businessManagerId: BusinessManagerId;
  involvedType: BusinessInvolvedType;
}