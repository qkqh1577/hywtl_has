import { createAction } from 'typesafe-actions';
import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import {
  ProjectEstimateExpectation,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import {
  ProjectAddParameter,
  ProjectStatusParameter
} from 'project/parameter';

export enum ProjectActionType {
  setFilter              = 'project/sales/filter/set',
  setPage                = 'project/sales/page/set',
  setOne                 = 'project/sales/one/set',
  updateStatus           = 'project/sales/status/update',
  add                    = 'project/sales/add',
  requestAdd             = 'project/sales/add/request',
  setAddModal            = 'project/sales/addModal/set',
  setEstimateExpectation = 'project/sales/estimateExpectation/set'
}

export const projectAction = {
  setFilter:              createAction(ProjectActionType.setFilter)<ProjectQuery>(),
  setPage:                createAction(ProjectActionType.setPage)<Page<ProjectShortVO> | undefined>(),
  setOne:                 createAction(ProjectActionType.setOne)<ProjectVO | undefined>(),
  updateStatus:           createAction(ProjectActionType.updateStatus)<ProjectStatusParameter>(),
  add:                    createAction(ProjectActionType.add)<ProjectAddParameter>(),
  requestAdd:             createAction(ProjectActionType.requestAdd)<string>(),
  setAddModal:            createAction(ProjectActionType.setAddModal)<boolean>(),
  setEstimateExpectation: createAction(ProjectActionType.setEstimateExpectation)<ProjectEstimateExpectation>(),
};
