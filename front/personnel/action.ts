import { createAction } from 'typesafe-actions';
import { FormikSubmit } from 'type/Form';
import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import {
  PersonnelAcademicVO,
  PersonnelBasicVO,
  PersonnelCareerVO,
  PersonnelCompanyVO,
  PersonnelJobVO,
  PersonnelLanguageVO,
  PersonnelLicenseVO,
  PersonnelShortVO,
} from 'personnel/domain';
import { PersonnelParameter } from 'personnel/parameter';
import { UserVO } from 'user/domain';

export enum PersonnelAction {
  setId             = 'personnel/id/set',
  setFilter         = 'personnel/filter/set',
  setPage           = 'personnel/page/set',
  setAccount        = 'personnel/account/set',
  setBasic          = 'personnel/basic/set',
  setCompany        = 'personnel/company/set',
  setJobList        = 'personnel/job-list/set',
  setAcademicList   = 'personnel/academic-list/set',
  setCareerList     = 'personnel/career-list/set',
  setLicenseList    = 'personnel/license-list/set',
  setLanguageList   = 'personnel/language-list/set',
  update            = 'personnel/update',
  setDepartmentList = 'personnel/department-list/set'
}

export const personnelAction = {
  setId:           createAction(PersonnelAction.setId)<number>(),
  setFilter:       createAction(PersonnelAction.setFilter)<FormikSubmit<PersonnelQuery>>(),
  setPage:         createAction(PersonnelAction.setPage)<Page<PersonnelShortVO> | undefined>(),
  setBasic:        createAction(PersonnelAction.setBasic)<PersonnelBasicVO | undefined>(),
  setAccount:      createAction(PersonnelAction.setAccount)<UserVO | undefined>(),
  setCompany:      createAction(PersonnelAction.setCompany)<PersonnelCompanyVO | undefined>(),
  setJobList:      createAction(PersonnelAction.setJobList)<PersonnelJobVO[] | undefined>(),
  setAcademicList: createAction(PersonnelAction.setAcademicList)<PersonnelAcademicVO[] | undefined>(),
  setCareerList:   createAction(PersonnelAction.setCareerList)<PersonnelCareerVO[] | undefined>(),
  setLicenseList:  createAction(PersonnelAction.setLicenseList)<PersonnelLicenseVO[] | undefined>(),
  setLanguageList: createAction(PersonnelAction.setLanguageList)<PersonnelLanguageVO[] | undefined>(),
  update:          createAction(PersonnelAction.update)<FormikSubmit<PersonnelParameter>>(),
};
