import { createAction } from 'typesafe-actions';
import {
  ListPersonnel,
  PersonnelAcademic,
  PersonnelBasic,
  PersonnelCareer,
  PersonnelCompany,
  PersonnelJob,
  PersonnelLanguage,
  PersonnelLicense
} from 'services/personnel/entity';
import { PersonnelParameter, PersonnelQuery } from 'services/personnel/parameter';
import Page from 'components/Page';

export enum PersonnelActionType {
  getPage = 'personnel/getPage',
  setPage = 'personnel/setPage',

  getBasic = 'personnel/basic/getOne',
  setBasic = 'personnel/basic/setOne',

  getCompany = 'personnel/company/getOne',
  setCompany = 'personnel/company/setOne',

  getJob = 'personnel/job/getOne',
  setJob = 'personnel/job/setOne',

  getJobList = 'personnel/job/getList',
  setJobList = 'personnel/job/setList',

  getAcademicList = 'personnel/academic/getList',
  setAcademicList = 'personnel/academic/setList',

  getCareerList = 'personnel/career/getList',
  setCareerList = 'personnel/career/setList',

  getLicenseList = 'personnel/license/getList',
  setLicenseList = 'personnel/license/setList',

  getLanguageList = 'personnel/language/getList',
  setLanguageList = 'personnel/language/setList',

  clearOne = 'personnel/clearOne',

  update = 'personnel/update',
  remove = 'personnel/remove',
}

export const personnelActions = {
  getPage: createAction(PersonnelActionType.getPage)<PersonnelQuery>(),
  setPage: createAction(PersonnelActionType.setPage)<Page<ListPersonnel>>(),
  getBasic: createAction(PersonnelActionType.getBasic)<number>(),
  setBasic: createAction(PersonnelActionType.setBasic)<PersonnelBasic | undefined>(),

  getCompany: createAction(PersonnelActionType.getCompany)<number>(),
  setCompany: createAction(PersonnelActionType.setCompany)<PersonnelCompany | undefined>(),

  getJob: createAction(PersonnelActionType.getJob)<number>(),
  setJob: createAction(PersonnelActionType.setJob)<PersonnelJob | undefined>(),

  getJobList: createAction(PersonnelActionType.getJobList)<number>(),
  setJobList: createAction(PersonnelActionType.setJobList)<PersonnelJob[] | undefined>(),

  getAcademicList: createAction(PersonnelActionType.getAcademicList)<number>(),
  setAcademicList: createAction(PersonnelActionType.setAcademicList)<PersonnelAcademic[] | undefined>(),

  getCareerList: createAction(PersonnelActionType.getCareerList)<number>(),
  setCareerList: createAction(PersonnelActionType.setCareerList)<PersonnelCareer[] | undefined>(),

  getLicenseList: createAction(PersonnelActionType.getLicenseList)<number>(),
  setLicenseList: createAction(PersonnelActionType.setLicenseList)<PersonnelLicense[] | undefined>(),

  getLanguageList: createAction(PersonnelActionType.getLanguageList)<number>(),
  setLanguageList: createAction(PersonnelActionType.setLanguageList)<PersonnelLanguage[] | undefined>(),

  clearOne: createAction(PersonnelActionType.clearOne)(),

  update: createAction(PersonnelActionType.update)<{
    params: PersonnelParameter;
    callback: () => void;
  }>(),
  remove: createAction(PersonnelActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
};
