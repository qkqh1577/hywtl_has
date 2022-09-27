import {
  ProjectBasicBidType,
  ProjectId,
  ProjectVO
} from 'project/domain';
import {
  ProjectBasicBid,
  ProjectBasicBusiness,
  ProjectBasicContract,
  ProjectBasicEstimate,
  ProjectBasicTest
} from 'project_basic/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectBasicActionType } from 'project_basic/action';

export interface ProjectBasicState {
  id?: ProjectId;
  basic?: ProjectVO;
  bidType?: ProjectBasicBidType;
  businessList?: ProjectBasicBusiness[];
  test?: ProjectBasicTest;
  estimate?: ProjectBasicEstimate;
  bid?: ProjectBasicBid;
  contract?: ProjectBasicContract;
}

const initial: ProjectBasicState = {};

export const projectBasicReducer = createReducer(initial, {
  [ProjectBasicActionType.setId]:           (state,
                                             action
                                            ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectBasicActionType.setBasic]:        (state,
                                             action
                                            ) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectBasicActionType.setBidType]:      (state,
                                             action
                                            ) => ({
    ...state,
    bidType: action.payload,
  }),
  [ProjectBasicActionType.setBusinessList]: (state,
                                             action
                                            ) => ({
    ...state,
    businessList: action.payload,
  }),
  [ProjectBasicActionType.setTest]:         (state,
                                             action
                                            ) => ({
    ...state,
    test: action.payload,
  }),
  [ProjectBasicActionType.setEstimate]:     (state,
                                             action
                                            ) => ({
    ...state,
    estimate: action.payload,
  }),
  [ProjectBasicActionType.setBid]:          (state,
                                             action
                                            ) => ({
    ...state,
    bid: action.payload,
  }),
  [ProjectBasicActionType.setContract]:     (state,
                                             action
                                            ) => ({
    ...state,
    contract: action.payload,
  })
});
