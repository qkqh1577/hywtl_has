import { createAction } from 'typesafe-actions';
import { FormikSubmit } from 'user/action';
import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import { ProjectShortVO } from 'project/domain';

export enum ProjectAction {
  setFilter = 'project/setFilter',
  setPage   = 'project/setPage',
}

export const projectAction = {
  setFilter: createAction(ProjectAction.setFilter)<FormikSubmit<ProjectQuery>>(),
  setPage:   createAction(ProjectAction.setPage)<Page<ProjectShortVO>>(),
};