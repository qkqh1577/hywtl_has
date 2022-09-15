import { createAction } from 'typesafe-actions';
import { FormikSubmit } from 'type/Form';
import { ProjectLogQuery } from 'project_log/query';
import { ProjectLogVO } from 'project_log/domain';
import Page from 'type/Page';
import { ProjectId } from 'project/domain';

export enum ProjectLogAction {
  setId     = 'project/sales/log/id/set',
  setFilter = 'project/sales/log/filter/set',
  setPage   = 'project/sales/log/page/set',
}

export const projectLogAction = {
  setId: createAction(ProjectLogAction.setId)<ProjectId | undefined>(),
  setFilter: createAction(ProjectLogAction.setFilter)<FormikSubmit<ProjectLogQuery>>(),
  setPage: createAction(ProjectLogAction.setPage)<Page<ProjectLogVO> | undefined>(),
}
