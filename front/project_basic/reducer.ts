import { ProjectId } from 'project/domain';
import {
  CityDataVO,
  ProjectBasicBusiness,
  ProjectBasicDesignVO,
  ProjectBasicExternalContributorVO,
  ProjectBasicFailReasonVO,
  ProjectBasicInternalContributorVO,
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
  internalList?: ProjectBasicInternalContributorVO[];
  externalList?: ProjectBasicExternalContributorVO[];
  businessList?: ProjectBasicBusiness[];
  business?: ProjectBasicBusiness;
  design?: ProjectBasicDesignVO;
  test?: ProjectComplexTestVO;
  estimate?: ProjectEstimateVO;
  rivalEstimateList?: RivalEstimateVO[];
  bid?: ProjectBidVO;
  rivalBidList?: RivalBidVO[];
  contract?: ProjectContractVO;
  failReason?: ProjectBasicFailReasonVO;
  requestUpdateBasic: ApiStatus;
  requestAddBusiness: ApiStatus;
  requestChangeBusiness: ApiStatus;
  requestDeleteBusiness: ApiStatus;
  requestUpdateDesign: ApiStatus;
  requestUpdateFailReason: ApiStatus;
  requestAddInternal: ApiStatus;
  requestUpdateInternal: ApiStatus;
  requestDeleteInternal: ApiStatus;
  requestAddExternal: ApiStatus;
  requestUpdateExternal: ApiStatus;
  requestDeleteExternal: ApiStatus;
  city1List: CityDataVO[];
  city2List: CityDataVO[];
}

const initial: ProjectBasicState = {
  requestUpdateBasic:      'idle',
  requestAddBusiness:      'idle',
  requestChangeBusiness:   'idle',
  requestDeleteBusiness:   'idle',
  requestUpdateDesign:     'idle',
  requestUpdateFailReason: 'idle',
  requestAddInternal:      'idle',
  requestUpdateInternal:   'idle',
  requestDeleteInternal:   'idle',
  requestAddExternal:      'idle',
  requestUpdateExternal:   'idle',
  requestDeleteExternal:   'idle',
  city1List:               [],
  city2List:               []
};

export const projectBasicReducer = createReducer(initial, {
  [ProjectBasicActionType.setId]:                   (state,
                                                     action
                                                    ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectBasicActionType.setInternalList]:         (state,
                                                     action
                                                    ) => ({
    ...state,
    internalList: action.payload,
  }),
  [ProjectBasicActionType.setExternalList]:         (state,
                                                     action
                                                    ) => ({
    ...state,
    externalList: action.payload,
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
  }),
  [ProjectBasicActionType.requestAddInternal]:      (state,
                                                     action
                                                    ) => ({
    ...state,
    requestAddInternal: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateInternal]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateInternal: action.payload,
  }),
  [ProjectBasicActionType.requestDeleteInternal]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestDeleteInternal: action.payload,
  }),
  [ProjectBasicActionType.requestAddExternal]:      (state,
                                                     action
                                                    ) => ({
    ...state,
    requestAddExternal: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateExternal]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateExternal: action.payload,
  }),
  [ProjectBasicActionType.requestDeleteExternal]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestDeleteExternal: action.payload,
  }),
  [ProjectBasicActionType.setCity1List]:            (state,
                                                     action
                                                    ) => ({
    ...state,
    city1List: action.payload,
  }),
  [ProjectBasicActionType.setCity2List]:            (state,
                                                     action
                                                    ) => ({
    ...state,
    city2List: action.payload,
  }),
});
