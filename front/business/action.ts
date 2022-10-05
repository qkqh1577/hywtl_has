import { createAction } from 'typesafe-actions';
import { BusinessQuery, } from 'business/query';
import Page from 'type/Page';
import {
  BusinessId,
  BusinessInvolvedProjectVO,
  BusinessInvolvedType,
  BusinessShort,
  BusinessVO,
  RivalProjectVO
} from 'business/domain';
import { BusinessParameter } from 'business/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum BusinessAction {
  setFilter                  = 'business/filter/set',
  setRegistrationNumber      = 'business/registration-number/set',
  setPage                    = 'business/page/set',
  setOne                     = 'business/one/set',
  setId                      = 'business/id/set',
  requestInvolvedProjectList = 'business/involved-project-list/request',
  setInvolvedProjectList     = 'business/involved-project-list/set',
  setRivalProjectList        = 'business/rival-project-list/set',
  upsert                     = 'business/upsert',
  requestUpsert              = 'business/upsert/request',
  deleteOne                  = 'business/delete',
  requestDelete              = 'business/delete/request',
}

export const businessAction = {
  setFilter:                  createAction(BusinessAction.setFilter)<BusinessQuery>(),
  setRegistrationNumber:      createAction(BusinessAction.setRegistrationNumber)<string>(),
  setPage:                    createAction(BusinessAction.setPage)<Page<BusinessShort> | undefined>(),
  requestInvolvedProjectList: createAction(BusinessAction.requestInvolvedProjectList)<BusinessInvolvedType | undefined>(),
  setInvolvedProjectList:     createAction(BusinessAction.setInvolvedProjectList)<BusinessInvolvedProjectVO[] | undefined>(),
  setRivalProjectList:        createAction(BusinessAction.setRivalProjectList)<RivalProjectVO[] | undefined>(),
  setOne:                     createAction(BusinessAction.setOne)<BusinessVO | undefined>(),
  setId:                      createAction(BusinessAction.setId)<BusinessId | undefined>(),
  upsert:                     createAction(BusinessAction.upsert)<BusinessParameter>(),
  deleteOne:                  createAction(BusinessAction.deleteOne)<BusinessId>(),
  requestUpsert:              createAction(BusinessAction.requestUpsert)<ApiStatus>(),
  requestDelete:              createAction(BusinessAction.requestDelete)<ApiStatus>(),
};
