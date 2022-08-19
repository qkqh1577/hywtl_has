import {
  ProjectEstimateType,
  ProjectProgressStatus,
  ProjectStatus
} from 'project/domain';
import { UserId } from 'user/domain';
import { FormikPartial } from 'type/Form';

export interface ProjectAddParameter {
  name: string;
  alias: string;
  receptionManager: UserId;
  progressStatus: ProjectProgressStatus;
  estimateType: ProjectEstimateType;
}

export const initialProjectAddParameter: FormikPartial<ProjectAddParameter> = {
  name:             '',
  alias:            '',
  receptionManager: '',
  progressStatus:   '',
  estimateType:     '',
};

export interface ProjectStatusParameter
  extends Partial<ProjectStatus> {
}