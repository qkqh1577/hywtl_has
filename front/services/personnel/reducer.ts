import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'components/Page';
import {
  ListPersonnel,
  PersonnelAcademic,
  PersonnelActionType,
  PersonnelBasic,
  PersonnelCareer,
  PersonnelCompany,
  PersonnelJob,
  PersonnelLanguage,
  PersonnelLicense,
} from 'services/personnel';

export type PersonnelState = {
  page: Page<ListPersonnel>;
  basic?: PersonnelBasic;
  company?: PersonnelCompany;
  job?: PersonnelJob;
  jobList?: PersonnelJob[];
  academicList?: PersonnelAcademic[];
  careerList?: PersonnelCareer[];
  licenseList?: PersonnelLicense[];
  languageList?: PersonnelLanguage[];
}

const initState: PersonnelState = {
  page: initial
};

const personnelReducer = createReducer(initState, {
  [PersonnelActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [PersonnelActionType.setBasic]: (state, action) => ({
    ...state,
    basic: action.payload,
  }),
  [PersonnelActionType.setCompany]: (state, action) => ({
    ...state,
    company: action.payload,
  }),
  [PersonnelActionType.setJob]: (state, action) => ({
    ...state,
    job: action.payload,
  }),
  [PersonnelActionType.setJobList]: (state, action) => ({
    ...state,
    jobList: action.payload,
  }),
  [PersonnelActionType.setAcademicList]: (state, action) => ({
    ...state,
    academicList: action.payload,
  }),
  [PersonnelActionType.setCareerList]: (state, action) => ({
    ...state,
    careerList: action.payload,
  }),
  [PersonnelActionType.setLicenseList]: (state, action) => ({
    ...state,
    licenseList: action.payload,
  }),
  [PersonnelActionType.setLanguageList]: (state, action) => ({
    ...state,
    languageList: action.payload,
  }),
  [PersonnelActionType.clearOne]: (state) => ({
    ...state,
    basic: undefined,
    company: undefined,
    jobList: undefined,
    academicList: undefined,
    careerList: undefined,
    languageList: undefined
  }),
});

export default personnelReducer;
