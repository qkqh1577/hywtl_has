import {
  ListProjectEstimateSheet,
  ProjectEstimate,
  ProjectEstimateSheet
} from 'services/project_estimate/entity';
import { createReducer } from 'typesafe-actions';
import { ProjectEstimateType } from 'services/project_estimate/actions';

export type ProjectEstimateState = {
  detail?: ProjectEstimate;
  sheetList?: ListProjectEstimateSheet[];
  sheetDetail?: ProjectEstimateSheet;
}

const initState: ProjectEstimateState = {};

const projectEstimateReducer = createReducer(initState, {
  [ProjectEstimateType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectEstimateType.setSheetList]: (state, action) => ({
    ...state,
    sheetList: action.payload,
  }),
  [ProjectEstimateType.setSheetOne]: (state, action) => ({
    ...state,
    sheetDetail: action.payload,
  })
});

export default projectEstimateReducer;
