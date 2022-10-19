import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId
} from 'business/domain';
import {
  ProjectBasicBusinessId,
  ProjectBasicFailReason
} from 'project_basic/domain';
import { UserId } from 'user/domain';
import { ProjectBasicBidType } from 'project/domain';

export interface ProjectBasicParameter {
  name?: string;
  alias?: string;
  bidType?: ProjectBasicBidType;
  receptionManagerId?: UserId;
  salesManager?: UserId;
  projectManager?: UserId;
  expectedMonth?: string;
  requestedMonth?: string;
  isLh?: boolean;
}

export interface ProjectBasicBusinessParameter {
  id?: ProjectBasicBusinessId;
  businessId: BusinessId;
  businessManagerId: BusinessManagerId;
  involvedType: BusinessInvolvedType;
}

export const initialProjectBasicBusinessParameter = {
  keywordType: 'by_name',
  edit:        true
} as unknown as ProjectBasicBusinessParameter;

export interface ProjectBasicFailReasonParameter
  extends Omit<ProjectBasicFailReason, 'modifiedAt' | 'win'> {
  winId: BusinessId;
}

export interface ProjectBasicDesignParameter {
  city?: string;
  address?: string;
  complexCount?: number;
  purpose1?: string;
  purpose2?: string;
  lotArea?: number;
  totalArea?: number;
  totalBuildingCount?: number;
  householdCount?: number;
  maximumFloor?: number;
  maximumHeight?: number;
}
