import { createAction } from 'typesafe-actions';
import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ProjectStatusParameter } from 'project/parameter';
import { FormikSubmit } from 'type/Form';

export enum ProjectAction {
  setFilter    = 'project/sales/filter/set',
  setPage      = 'project/sales/page/set',
  setOne       = 'project/sales/one/set',
  updateStatus = 'project/sales/status/update'
}

export const projectAction = {
  setFilter:    createAction(ProjectAction.setFilter)<FormikSubmit<ProjectQuery>>(),
  setPage:      createAction(ProjectAction.setPage)<Page<ProjectShortVO> | undefined>(),
  setOne:       createAction(ProjectAction.setOne)<ProjectVO | undefined>(),
  updateStatus: createAction(ProjectAction.updateStatus)<FormikSubmit<ProjectStatusParameter>>(),
};