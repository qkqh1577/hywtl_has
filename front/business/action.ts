import {createAction} from "typesafe-actions";
import {FormikSubmit} from "user/action";
import { BusinessQuery, RegistrationNumberQuery } from "business/query";
import Page from "type/Page";
import { BusinessShort, BusinessVO, InvolvedProjectVO, RivalProjectVO } from "business/domain";
import {BusinessParameter} from "business/parameter";

export enum BusinessAction {
  setFilter = 'business/filter/set',
  setRegistrationNumber = 'business/registration-number/set',
  setPage = 'business/page/set',
  setList = 'business/list/set',
  setOne = 'business/one/set',
  setInvolvedProjectList = 'business/id/involved-project-list/set',
  setRivalProjectList = 'business/id/rival-project-list/set',
  upsert = 'business/upsert',
}

export const businessAction = {
  setFilter: createAction(BusinessAction.setFilter)<FormikSubmit<BusinessQuery>>(),
  setRegistrationNumber: createAction(BusinessAction.setRegistrationNumber)<FormikSubmit<RegistrationNumberQuery>>(),
  setPage: createAction(BusinessAction.setPage)<Page<BusinessShort> | undefined>(),
  setList: createAction(BusinessAction.setList)<BusinessShort[]>(),
  setInvolvedProjectList: createAction(BusinessAction.setInvolvedProjectList)< InvolvedProjectVO[]>(),
  setRivalProjectList: createAction(BusinessAction.setRivalProjectList)<RivalProjectVO[]>(),
  setOne: createAction(BusinessAction.setOne)<BusinessVO | undefined>(),
  upsert: createAction(BusinessAction.upsert)<FormikSubmit<BusinessParameter>>(),
};
