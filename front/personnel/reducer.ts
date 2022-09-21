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
  PersonnelVO
} from 'personnel/domain';
import { createReducer } from 'typesafe-actions';
import { PersonnelAction } from 'personnel/action';

export interface PersonnelState {
  filter?: PersonnelQuery;
  page?: Page<PersonnelVO>;
  basic?: PersonnelBasicVO;
  company?: PersonnelCompanyVO;
  jobList?: PersonnelJobVO[];
  academicList?: PersonnelAcademicVO[];
  careerList?: PersonnelCareerVO[];
  licenseList?: PersonnelLicenseVO[];
  languageList?: PersonnelLanguageVO[];
}

const initialState: PersonnelState = {};

export const personnelReducer = createReducer(initialState, {
  [PersonnelAction.setFilter]: (state,
                                action
                               ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [PersonnelAction.setPage]: (state,
                                action
                               ) => ({
    ...state,
    page: action.payload,
  }),
  [PersonnelAction.setBasic]: (state,
                              action
                             ) => ({
    ...state,
    basic: action.payload,
  }),
  [PersonnelAction.setCompany]: (state,
                              action
                             ) => ({
    ...state,
    company: action.payload,
  }),
  [PersonnelAction.setJobList]: (state,
                              action
                             ) => ({
    ...state,
    jobList: action.payload,
  }),
  [PersonnelAction.setAcademicList]: (state,
                              action
                             ) => ({
    ...state,
    academicList: action.payload,
  }),
  [PersonnelAction.setCareerList]: (state,
                              action
                             ) => ({
    ...state,
    careerList: action.payload,
  }),
  [PersonnelAction.setLicenseList]: (state,
                                    action
                                   ) => ({
    ...state,
    licenseList: action.payload,
  }),
  [PersonnelAction.setLanguageList]: (state,
                                    action
                                   ) => ({
    ...state,
    languageList: action.payload,
  }),
})
