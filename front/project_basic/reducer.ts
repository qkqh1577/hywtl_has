import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicDesign,
} from 'project_basic/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectBasicActionType } from 'project_basic/action';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectComplexTestVO } from 'project_complex/domain';

export interface ProjectBasicState {
  id?: ProjectId;
  basic?: ProjectBasic;
  businessList?: ProjectBasicBusiness[];
  businessModal?: ProjectBasicBusiness;
  design?: ProjectBasicDesign;
  test?: ProjectComplexTestVO;
  requestUpdateBasic: ApiStatus;
  requestAddBusiness: ApiStatus;
  requestChangeBusiness: ApiStatus;
  requestDeleteBusiness: ApiStatus;
  requestUpdateDesign: ApiStatus;
}

const initial: ProjectBasicState = {
  requestUpdateBasic:    ApiStatus.IDLE,
  requestAddBusiness:    ApiStatus.IDLE,
  requestChangeBusiness: ApiStatus.IDLE,
  requestDeleteBusiness: ApiStatus.IDLE,
  requestUpdateDesign:   ApiStatus.IDLE,
};

export const projectBasicReducer = createReducer(initial, {
  [ProjectBasicActionType.setId]:                 (state,
                                                   action
                                                  ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectBasicActionType.setBasic]:              (state,
                                                   action
                                                  ) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectBasicActionType.setBusinessList]:       (state,
                                                   action
                                                  ) => ({
    ...state,
    businessList: action.payload,
  }),
  [ProjectBasicActionType.setBusinessModal]:      (state,
                                                   action
                                                  ) => ({
    ...state,
    businessModal: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateBasic]:    (state,
                                                   action
                                                  ) => ({
    ...state,
    requestUpdateBasic: action.payload,
  }),
  [ProjectBasicActionType.requestAddBusiness]:    (state,
                                                   action
                                                  ) => ({
    ...state,
    requestAddBusiness: action.payload,
  }),
  [ProjectBasicActionType.requestChangeBusiness]: (state,
                                                   action
                                                  ) => ({
    ...state,
    requestChangeBusiness: action.payload,
  }),
  [ProjectBasicActionType.requestDeleteBusiness]: (state,
                                                   action
                                                  ) => ({
    ...state,
    requestDeleteBusiness: action.payload,
  }),
  [ProjectBasicActionType.setDesign]:             (state,
                                                   action
                                                  ) => ({
    ...state,
    design: action.payload,
  }),
  [ProjectBasicActionType.requestUpdateDesign]:   (state,
                                                   action
                                                  ) => ({
    ...state,
    requestUpdateDesign: action.payload,
  }),
  [ProjectBasicActionType.setTest]:               (state,
                                                   action
                                                  ) => ({
    ...state,
    test: action.payload,
  })
});
