import { createAction } from 'typesafe-actions';
import { BusinessQuery, } from 'business/query';
import Page from 'type/Page';
import {
  BusinessId,
  BusinessInvolvedProjectVO,
  BusinessInvolvedType,
  BusinessShortVO,
  BusinessVO,
  RegistrationNumberState,
  RivalProjectVO
} from 'business/domain';
import { BusinessParameter } from 'business/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum BusinessActionType {
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
  checkRegistrationNumber    = 'business/registration-number/check',
}

export const businessAction = {
  setFilter:                  createAction(BusinessActionType.setFilter)<BusinessQuery>(),
  setRegistrationNumber:      createAction(BusinessActionType.setRegistrationNumber)<string>(),
  setPage:                    createAction(BusinessActionType.setPage)<Page<BusinessShortVO> | undefined>(),
  requestInvolvedProjectList: createAction(BusinessActionType.requestInvolvedProjectList)<BusinessInvolvedType | undefined>(),
  setInvolvedProjectList:     createAction(BusinessActionType.setInvolvedProjectList)<BusinessInvolvedProjectVO[] | undefined>(),
  setRivalProjectList:        createAction(BusinessActionType.setRivalProjectList)<RivalProjectVO[] | undefined>(),
  setOne:                     createAction(BusinessActionType.setOne)<BusinessVO | undefined>(),
  setId:                      createAction(BusinessActionType.setId)<BusinessId | undefined>(),
  upsert:                     createAction(BusinessActionType.upsert)<BusinessParameter>(),
  deleteOne:                  createAction(BusinessActionType.deleteOne)<BusinessId>(),
  requestUpsert:              createAction(BusinessActionType.requestUpsert)<ApiStatus>(),
  requestDelete:              createAction(BusinessActionType.requestDelete)<ApiStatus>(),
  checkRegistrationNumber:    createAction(BusinessActionType.checkRegistrationNumber)<RegistrationNumberState>(),
};
