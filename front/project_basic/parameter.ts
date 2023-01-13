import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId
} from 'business/domain';
import {
  ProjectBasicBusinessId,
  ProjectBasicContributorId,
  ProjectBasicFailReasonVO
} from 'project_basic/domain';
import { UserId } from 'user/domain';
import { ProjectBasicBidType } from 'project/domain';

export interface ProjectBasicParameter {
  name?: string;
  alias?: string;
  bidType?: ProjectBasicBidType;

  receptionManagerId?: UserId;
  resetReceptionManagerId?: boolean,

  salesManager?: UserId;
  resetSalesManager?: boolean;

  projectManager?: UserId;
  resetProjectManager?: boolean;

  expectedMonth?: string;
  resetExpectedMonth?: boolean;

  requestedMonth?: string;
  resetRequestedMonth?: boolean;

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
  extends Omit<ProjectBasicFailReasonVO, 'modifiedAt' | 'win'> {
  winId: BusinessId;
}

export const initialProjectBasicFailReasonParameter = {} as ProjectBasicFailReasonParameter;

export interface ProjectBasicDesignParameter {
  city1?: string;
  city2?: string;
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

export interface ProjectBasicInternalContributorParameter {
  id: ProjectBasicContributorId;
  rate?: number;
  userId?: UserId;
}

export interface ProjectBasicExternalContributorParameter {
  id: ProjectBasicContributorId;
  rate?: number;
  businessId?: BusinessId;
  businessManagerId?: BusinessManagerId;
}
