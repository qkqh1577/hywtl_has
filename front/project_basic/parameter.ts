import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId
} from 'business/domain';
import { ProjectBasicFailReason } from 'project_basic/domain';

export interface ProjectBasicBusinessParameter {
  businessId: BusinessId;
  businessManagerId: BusinessManagerId;
  involvedType: BusinessInvolvedType;
}

export interface ProjectBasicFailReasonParameter
  extends Omit<ProjectBasicFailReason, 'modifiedAt' | 'win'> {
  winId: BusinessId;
}
