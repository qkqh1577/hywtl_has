import { UserVO } from 'user/domain';
import { BusinessVO } from 'business/domain';

export type ProjectEstimateId = number & { readonly  _brand: unique symbol; };

export function ProjectEstimateId(id: number) {
  return id as ProjectEstimateId;
}

export enum ProjectEstimateType {
  CUSTOM         = 'CUSTOM',
  SYSTEM         = 'SYSTEM',
  COMPARISON     = 'COMPARISON',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
}

export function projectEstimateTypeName(type: ProjectEstimateType) {
  switch (type) {
    case ProjectEstimateType.CUSTOM:
      return '커스텀';
    case ProjectEstimateType.SYSTEM:
      return '시스템';
    case ProjectEstimateType.COMPARISON:
      return '대비';
    case ProjectEstimateType.SUB_CONTRACTOR:
      return '협력';
    default:
      return '-';
  }
}

export interface ProjectEstimateVO {
  id: ProjectEstimateId;
  code: string;
  type: ProjectEstimateType;
  recipient: string;
  business: BusinessVO;
  confirmed: boolean;
  createdAt: Date;
  createdBy: UserVO;
  isSent: boolean;
  modifiedAt?: Date;
}

export interface ProjectCustomEstimateVO
  extends ProjectEstimateVO {

}
