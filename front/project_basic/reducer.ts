import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBid,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicContract,
  ProjectBasicDesign,
  ProjectBasicEstimate,
  ProjectBasicFailReason,
  ProjectBasicTest
} from 'project_basic/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectBasicActionType } from 'project_basic/action';
import { ProjectBasicBidType } from 'project_status/domain';
import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId,
  BusinessManagerVO,
  BusinessVO
} from 'business/domain';

type filterCondition = { keywordType: string, keyword: string };

export type BusinessAddModal = {
  open: boolean,
  isSubmitting: boolean,
  selected?: {
    involvedType?: BusinessInvolvedType;
    businessId?: BusinessId;
    businessManagerId?: BusinessManagerId;
  },
  values?: {
    businessList: BusinessVO[];
    businessFilterCondition?: filterCondition;
    businessManagerList: BusinessManagerVO[];
    businessManagerFilterCondition?: filterCondition;
  }
};

export type BusinessDetailModal = {
  open: boolean,
  isSubmitting: boolean,
  id?: ProjectBasicBusinessId,
  values?: {
    involvedType: BusinessInvolvedType;
    business: BusinessVO;
    businessManager: BusinessManagerVO;
  }
};

export type BusinessUpdateModal = {
  open: boolean,
  isSubmitting: boolean,
  id?: ProjectBasicBusinessId,
  selected?: {
    involvedType?: BusinessInvolvedType;
    businessId?: BusinessId;
    businessManagerId?: BusinessManagerId;
  },
  values?: {
    businessList: BusinessVO[];
    businessFilterCondition?: filterCondition;
    businessManagerList: BusinessManagerVO[];
    businessManagerFilterCondition?: filterCondition;
  }
};

export interface ProjectBasicState {
  id?: ProjectId;
  basic?: ProjectBasic;
  bidType?: ProjectBasicBidType;
  businessList?: ProjectBasicBusiness[];
  businessAddModal: BusinessAddModal;
  businessDetailModal: BusinessDetailModal;
  businessUpdateModal: BusinessUpdateModal;
  design?: ProjectBasicDesign;
  test?: ProjectBasicTest;
  estimate?: ProjectBasicEstimate;
  bid?: ProjectBasicBid;
  contract?: ProjectBasicContract;
  failReason?: ProjectBasicFailReason;
  lossEstimateExpectation: boolean;
}

const initial: ProjectBasicState = {
  businessAddModal:        { open: false, isSubmitting: false },
  businessDetailModal:     { open: false, isSubmitting: false },
  businessUpdateModal:     { open: false, isSubmitting: false },
  lossEstimateExpectation: false,
};

export const projectBasicReducer = createReducer(initial, {
  [ProjectBasicActionType.setId]:                      (state,
                                                        action
                                                       ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectBasicActionType.setBasic]:                   (state,
                                                        action
                                                       ) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectBasicActionType.setBidType]:                 (state,
                                                        action
                                                       ) => ({
    ...state,
    bidType: action.payload,
  }),
  [ProjectBasicActionType.setBusinessList]:            (state,
                                                        action
                                                       ) => ({
    ...state,
    businessList: action.payload,
  }),
  [ProjectBasicActionType.setBusinessAddModal]:        (state,
                                                        action
                                                       ) => ({
    ...state,
    businessAddModal: action.payload,
  }),
  [ProjectBasicActionType.setBusinessDetailModal]:     (state,
                                                        action
                                                       ) => ({
    ...state,
    businessDetailModal: action.payload,
  }),
  [ProjectBasicActionType.setBusinessUpdateModal]:     (state,
                                                        action
                                                       ) => ({
    ...state,
    businessUpdateModal: action.payload,
  }),
  [ProjectBasicActionType.setDesign]:                  (state,
                                                        action
                                                       ) => ({
    ...state,
    design: action.payload,
  }),
  [ProjectBasicActionType.setTest]:                    (state,
                                                        action
                                                       ) => ({
    ...state,
    test: action.payload,
  }),
  [ProjectBasicActionType.setEstimate]:                (state,
                                                        action
                                                       ) => ({
    ...state,
    estimate: action.payload,
  }),
  [ProjectBasicActionType.setBid]:                     (state,
                                                        action
                                                       ) => ({
    ...state,
    bid: action.payload,
  }),
  [ProjectBasicActionType.setContract]:                (state,
                                                        action
                                                       ) => ({
    ...state,
    contract: action.payload,
  }),
  [ProjectBasicActionType.setFailReason]:              (state,
                                                        action
                                                       ) => ({
    ...state,
    failReason: action.payload,
  }),
  [ProjectBasicActionType.setLossEstimateExpectation]: (state,
                                                        action
                                                       ) => ({
    ...state,
    lossEstimateExpectation: action.payload,
  }),
});
