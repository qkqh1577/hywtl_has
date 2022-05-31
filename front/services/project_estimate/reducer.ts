import { createReducer } from 'typesafe-actions';
import {
  ProjectEstimate,
  ProjectEstimateSheet,
  ProjectEstimateSheetShort,
  ProjectEstimateType,
} from 'services/project_estimate';

export type ProjectEstimateState = {
  detail?: ProjectEstimate;
  sheetList?: ProjectEstimateSheetShort[];
  sheetDetail?: ProjectEstimateSheet;
  sheetId?: number | null;
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
  }),
  [ProjectEstimateType.setSheetId]: (state, action) => ({
    ...state,
    sheetId: action.payload,
  })
});

export default projectEstimateReducer;
