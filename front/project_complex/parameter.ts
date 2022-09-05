import {
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO,
  ProjectComplexSiteId,
  ProjectComplexSiteVO
} from 'project_complex/domain';
import {
  UserId,
} from 'user/domain';
import { ProjectDocumentId } from 'project/document/domain';

export interface ProjectComplexSiteParameter
  extends Omit<ProjectComplexSiteVO, | 'manager' | 'modifiedAt'> {
  managerId?: UserId; // 담당자
}

export interface ProjectComplexBuildingParameter
  extends Omit<ProjectComplexBuildingVO, | 'site' | 'buildingDocument' | 'modifiedAt'> {
  siteId?: ProjectComplexSiteId;
  buildingDocumentId?: ProjectDocumentId;
}

export interface ProjectComplexBuildingFileParameter {
  id: ProjectComplexBuildingId;
  fileId?: ProjectDocumentId;
}