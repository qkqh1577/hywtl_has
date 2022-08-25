import { createAction } from 'typesafe-actions';
import {
  BusinessQuery,
} from 'business/query';
import Page from 'type/Page';
import {
  BusinessId,
  BusinessShort,
  BusinessVO,
  InvolvedProjectVO,
  RivalProjectVO
} from 'business/domain';
import { BusinessParameter } from 'business/parameter';
import { FormikSubmit } from 'type/Form';

export enum BusinessAction {
  setFilter              = 'business/filter/set',
  setRegistrationNumber  = 'business/registration-number/set',
  setPage                = 'business/page/set',
  setOne                 = 'business/one/set',
  setInvolvedProjectList = 'business/id/involved-project-list/set',
  setRivalProjectList    = 'business/id/rival-project-list/set',
  upsert                 = 'business/upsert',
  delete                 = 'business/delete',
}

export const businessAction = {
  setFilter:              createAction(BusinessAction.setFilter)<FormikSubmit<BusinessQuery>>(),
  setRegistrationNumber:  createAction(BusinessAction.setRegistrationNumber)<string>(),
  setPage:                createAction(BusinessAction.setPage)<Page<BusinessShort> | undefined>(),
  setInvolvedProjectList: createAction(BusinessAction.setInvolvedProjectList)<InvolvedProjectVO[]>(),
  setRivalProjectList:    createAction(BusinessAction.setRivalProjectList)<RivalProjectVO[]>(),
  setOne:                 createAction(BusinessAction.setOne)<BusinessVO | undefined>(),
  upsert:                 createAction(BusinessAction.upsert)<FormikSubmit<BusinessParameter>>(),
  delete:                 createAction(BusinessAction.delete)<BusinessId>(),
};
