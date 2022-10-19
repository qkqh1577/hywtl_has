import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicDesign,
  ProjectBasicFailReason,
} from 'project_basic/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectBasicActionType } from 'project_basic/action';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { RivalBidVO } from 'rival_bid/domain';
import { ProjectContractVO } from 'project_contract/domain';

export interface ProjectBasicState {
  id?: ProjectId;
  basic?: ProjectBasic;
  businessList?: ProjectBasicBusiness[];
  business?: ProjectBasicBusiness;
  design?: ProjectBasicDesign;
  test?: ProjectComplexTestVO;
  estimate?: ProjectEstimateVO;
  rivalEstimateList?: RivalEstimateVO[];
  bid?: ProjectBidVO;
  rivalBidList?: RivalBidVO[];
  contract?: ProjectContractVO;
  failReason?: ProjectBasicFailReason;
  requestUpdateBasic: ApiStatus;
  requestAddBusiness: ApiStatus;
  requestChangeBusiness: ApiStatus;
  requestDeleteBusiness: ApiStatus;
  requestUpdateDesign: ApiStatus;
  requestUpdateFailReason: ApiStatus;
}

const initial: ProjectBasicState = {
  requestUpdateBasic:      ApiStatus.IDLE,
  requestAddBusiness:      ApiStatus.IDLE,
  requestChangeBusiness:   ApiStatus.IDLE,
  requestDeleteBusiness:   ApiStatus.IDLE,
  requestUpdateDesign:     ApiStatus.IDLE,
  requestUpdateFailReason: ApiStatus.IDLE,

};

export const projectBasicReducer = createReducer(initial, {
  [ProjectBasicActionType.setId]:                   (state,
                                                     action
                                                    ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectBasicActionType.setBasic]:                (state,
                                                     action
                                                    ) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateBasic]:      (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateBasic: action.payload,
  }),
  [ProjectBasicActionType.setBusinessList]:         (state,
                                                     action
                                                    ) => ({
    ...state,
    businessList: action.payload,
  }),
  [ProjectBasicActionType.setBusiness]:             (state,
                                                     action
                                                    ) => ({
    ...state,
    business: action.payload,
  }),
  [ProjectBasicActionType.requestAddBusiness]:      (state,
                                                     action
                                                    ) => ({
    ...state,
    requestAddBusiness: action.payload,
  }),
  [ProjectBasicActionType.requestChangeBusiness]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestChangeBusiness: action.payload,
  }),
  [ProjectBasicActionType.requestDeleteBusiness]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestDeleteBusiness: action.payload,
  }),
  [ProjectBasicActionType.setDesign]:               (state,
                                                     action
                                                    ) => ({
    ...state,
    design: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateDesign]:     (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateDesign: action.payload,
  }),
  [ProjectBasicActionType.setTest]:                 (state,
                                                     action
                                                    ) => ({
    ...state,
    test: action.payload,
  }),
  [ProjectBasicActionType.setEstimate]:             (state,
                                                     action
                                                    ) => ({
    ...state,
    estimate: action.payload,
  }),
  [ProjectBasicActionType.setRivalEstimateList]:    (state,
                                                     action
                                                    ) => ({
    ...state,
    rivalEstimateList: action.payload,
  }),
  [ProjectBasicActionType.setBid]:                  (state,
                                                     action
                                                    ) => ({
    ...state,
    bid: action.payload,
  }),
  [ProjectBasicActionType.setRivalBidList]:         (state,
                                                     action
                                                    ) => ({
    ...state,
    rivalBidList: action.payload,
  }),
  [ProjectBasicActionType.setContract]:             (state,
                                                     action
                                                    ) => ({
    ...state,
    contract: action.payload,
  }),
  [ProjectBasicActionType.setFailReason]:           (state,
                                                     action
                                                    ) => ({
    ...state,
    failReason: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateFailReason]: (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateFailReason: action.payload,
  })
});
