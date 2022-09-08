import {
  ProjectBasicBidType,
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
  bidType: ProjectBasicBidType;
}

export const initialProjectAddParameter: FormikPartial<ProjectAddParameter> = {
  name:             '',
  alias:            '',
  receptionManager: '',
  progressStatus:   '',
  bidType:          '',
};

export interface ProjectStatusParameter
  extends Partial<ProjectStatus> {
}