import {
  BusinessManagerVO,
  BusinessShort,
  BusinessInvolvedType
} from 'business/domain';

export type ProjectBasicBusinessId = number & { readonly _brand: unique symbol; }

export function ProjectBasicBusinessId(id: number) {
  return id as ProjectBasicBusinessId;
}

export interface ProjectBasicBusiness {
  id: ProjectBasicBusinessId;
  business: BusinessShort;
  businessManager: BusinessManagerVO;
  involvedType: BusinessInvolvedType;
}