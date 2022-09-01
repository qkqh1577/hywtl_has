import { ProjectId } from 'project/domain';
import { ProjectBasicBusiness } from 'project/basic/domain';

export interface ProjectBasicRoute {
  id?: ProjectId;
  businessList?: ProjectBasicBusiness[];

}