import { createAction } from 'typesafe-actions';
import { ProjectLogQuery } from 'project_log/query';
import { ProjectLogVO } from 'project_log/domain';
import Page from 'type/Page';
import { ProjectId } from 'project/domain';

export enum ProjectLogActionType {
  setId     = 'project/sales/log/id/set',
  setFilter = 'project/sales/log/filter/set',
  setPage   = 'project/sales/log/page/set',
}

export const projectLogAction = {
  setId:     createAction(ProjectLogActionType.setId)<ProjectId | undefined>(),
  setFilter: createAction(ProjectLogActionType.setFilter)<ProjectLogQuery>(),
  setPage:   createAction(ProjectLogActionType.setPage)<Page<ProjectLogVO> | undefined>(),
};
