import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  CityDataVO,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicContributorId,
  ProjectBasicDesignVO,
  ProjectBasicExternalContributorVO,
  ProjectBasicFailReasonVO,
  ProjectBasicInternalContributorVO,
} from 'project_basic/domain';
import {
  ProjectBasicBusinessParameter,
  ProjectBasicDesignParameter,
  ProjectBasicExternalContributorParameter,
  ProjectBasicFailReasonParameter,
  ProjectBasicInternalContributorParameter,
  ProjectBasicParameter
} from 'project_basic/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import { BusinessId } from 'business/domain';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { RivalBidVO } from 'rival_bid/domain';
import { ProjectContractVO } from 'project_contract/domain';

export enum ProjectBasicActionType {
  setId                   = 'project/basic/id/set',

  getInternalList         = 'project/basic/contributor/internal/get',
  setInternalList         = 'project/basic/contributor/internal/set',
  addInternal             = 'project/basic/contributor/internal/add',
  updateInternal          = 'project/basic/contributor/internal/update',
  deleteInternal          = 'project/basic/contributor/internal/delete',
  requestAddInternal      = 'project/basic/contributor/internal/add/request',
  requestUpdateInternal   = 'project/basic/contributor/internal/update/request',
  requestDeleteInternal   = 'project/basic/contributor/internal/delete/request',

  getExternalList         = 'project/basic/contributor/external/get',
  setExternalList         = 'project/basic/contributor/external/set',
  addExternal             = 'project/basic/contributor/external/add',
  updateExternal          = 'project/basic/contributor/external/update',
  deleteExternal          = 'project/basic/contributor/external/delete',
  requestAddExternal      = 'project/basic/contributor/external/add/request',
  requestUpdateExternal   = 'project/basic/contributor/external/update/request',
  requestDeleteExternal   = 'project/basic/contributor/external/delete/request',

  updateBasic             = 'project/basic/update',
  requestUpdateBasic      = 'project/basic/update/request',

  getBusinessList         = 'project/basic/business-list/get',
  setBusinessList         = 'project/basic/business-list/set',
  getBusiness             = 'project/basic/business/get',
  setBusiness             = 'project/basic/business/set',
  addBusiness             = 'project/basic/business/add',
  changeBusiness          = 'project/basic/business/change',
  deleteBusiness          = 'project/basic/business/delete',
  requestAddBusiness      = 'project/basic/business/add/request',
  requestChangeBusiness   = 'project/basic/business/change/request',
  requestDeleteBusiness   = 'project/basic/business/delete/request',

  getDesign               = 'project/basic/design/get',
  setDesign               = 'project/basic/design/set',
  updateDesign            = 'project/basic/design/update',
  requestUpdateDesign     = 'project/basic/design/update/request',
  getCity1List            = 'project/basic/design/city1-list/get',
  setCity1List            = 'project/basic/design/city1-list/set',
  getCity2List            = 'project/basic/design/city2-list/get',
  setCity2List            = 'project/basic/design/city2-list/set',

  getTest                 = 'project/basic/test/get',
  setTest                 = 'project/basic/test/set',

  getEstimate             = 'project/basic/estimate/get',
  setEstimate             = 'project/basic/estimate/set',

  getRivalEstimateList    = 'project/basic/rival-estimate-list/get',
  setRivalEstimateList    = 'project/basic/rival-estimate-list/set',

  getBid                  = 'project/basic/bid/get',
  setBid                  = 'project/basic/bid/set',

  getRivalBidList         = 'project/basic/rival-bid-list/get',
  setRivalBidList         = 'project/basic/rival-bid-list/set',

  getContract             = 'project/basic/contract/get',
  setContract             = 'project/basic/contract/set',

  getFailReason           = 'project/basic/fail-reason/get',
  setFailReason           = 'project/basic/fail-reason/set',
  updateFailReason        = 'project/basic/fail-reason/update',
  requestUpdateFailReason = 'project/basic/fail-reason/update/request',
}

export const projectBasicAction = {
  setId: createAction(ProjectBasicActionType.setId)<ProjectId | undefined>(),

  getInternalList:       createAction(ProjectBasicActionType.getInternalList)<ProjectId | undefined>(),
  setInternalList:       createAction(ProjectBasicActionType.setInternalList)<ProjectBasicInternalContributorVO[] | undefined>(),
  addInternal:           createAction(ProjectBasicActionType.addInternal)<ProjectId>(),
  updateInternal:        createAction(ProjectBasicActionType.updateInternal)<ProjectBasicInternalContributorParameter>(),
  deleteInternal:        createAction(ProjectBasicActionType.deleteInternal)<ProjectBasicContributorId>(),
  requestAddInternal:    createAction(ProjectBasicActionType.requestAddInternal)<ApiStatus>(),
  requestUpdateInternal: createAction(ProjectBasicActionType.requestUpdateInternal)<ApiStatus>(),
  requestDeleteInternal: createAction(ProjectBasicActionType.requestDeleteInternal)<ApiStatus>(),

  getExternalList:       createAction(ProjectBasicActionType.getExternalList)<ProjectId | undefined>(),
  setExternalList:       createAction(ProjectBasicActionType.setExternalList)<ProjectBasicExternalContributorVO[] | undefined>(),
  addExternal:           createAction(ProjectBasicActionType.addExternal)<ProjectId>(),
  updateExternal:        createAction(ProjectBasicActionType.updateExternal)<ProjectBasicExternalContributorParameter>(),
  deleteExternal:        createAction(ProjectBasicActionType.deleteExternal)<ProjectBasicContributorId>(),
  requestAddExternal:    createAction(ProjectBasicActionType.requestAddExternal)<ApiStatus>(),
  requestUpdateExternal: createAction(ProjectBasicActionType.requestUpdateExternal)<ApiStatus>(),
  requestDeleteExternal: createAction(ProjectBasicActionType.requestDeleteExternal)<ApiStatus>(),

  updateBasic:        createAction(ProjectBasicActionType.updateBasic)<ProjectBasicParameter>(),
  requestUpdateBasic: createAction(ProjectBasicActionType.requestUpdateBasic)<ApiStatus>(),

  getBusinessList:       createAction(ProjectBasicActionType.getBusinessList)<ProjectId | undefined>(),
  setBusinessList:       createAction(ProjectBasicActionType.setBusinessList)<ProjectBasicBusiness[] | undefined>(),
  getBusiness:           createAction(ProjectBasicActionType.getBusiness)<BusinessId | undefined>(),
  setBusiness:           createAction(ProjectBasicActionType.setBusiness)<ProjectBasicBusinessParameter | undefined>(),
  addBusiness:           createAction(ProjectBasicActionType.addBusiness)<ProjectBasicBusinessParameter>(),
  changeBusiness:        createAction(ProjectBasicActionType.changeBusiness)<ProjectBasicBusinessParameter>(),
  deleteBusiness:        createAction(ProjectBasicActionType.deleteBusiness)<ProjectBasicBusinessId>(),
  requestAddBusiness:    createAction(ProjectBasicActionType.requestAddBusiness)<ApiStatus>(),
  requestChangeBusiness: createAction(ProjectBasicActionType.requestChangeBusiness)<ApiStatus>(),
  requestDeleteBusiness: createAction(ProjectBasicActionType.requestDeleteBusiness)<ApiStatus>(),

  getDesign:           createAction(ProjectBasicActionType.getDesign)<ProjectId | undefined>(),
  setDesign:           createAction(ProjectBasicActionType.setDesign)<ProjectBasicDesignVO | undefined>(),
  updateDesign:        createAction(ProjectBasicActionType.updateDesign)<ProjectBasicDesignParameter>(),
  requestUpdateDesign: createAction(ProjectBasicActionType.requestUpdateDesign)<ApiStatus>(),
  setCity1List:        createAction(ProjectBasicActionType.setCity1List)<CityDataVO[] | undefined>(),
  getCity1List:        createAction(ProjectBasicActionType.getCity1List)(),
  setCity2List:        createAction(ProjectBasicActionType.setCity2List)<CityDataVO[] | undefined>(),
  getCity2List:        createAction(ProjectBasicActionType.getCity2List)<string | undefined>(),

  getTest: createAction(ProjectBasicActionType.getTest)<ProjectId | undefined>(),
  setTest: createAction(ProjectBasicActionType.setTest)<ProjectComplexTestVO | undefined>(),

  getEstimate: createAction(ProjectBasicActionType.getEstimate)<ProjectId | undefined>(),
  setEstimate: createAction(ProjectBasicActionType.setEstimate)<ProjectEstimateVO | undefined>(),

  getRivalEstimateList: createAction(ProjectBasicActionType.getRivalEstimateList)<ProjectId | undefined>(),
  setRivalEstimateList: createAction(ProjectBasicActionType.setRivalEstimateList)<RivalEstimateVO[] | undefined>(),

  getBid: createAction(ProjectBasicActionType.getBid)<ProjectId | undefined>(),
  setBid: createAction(ProjectBasicActionType.setBid)<ProjectBidVO | undefined>(),

  getRivalBidList: createAction(ProjectBasicActionType.getRivalBidList)<ProjectId | undefined>(),
  setRivalBidList: createAction(ProjectBasicActionType.setRivalBidList)<RivalBidVO[] | undefined>(),

  getContract: createAction(ProjectBasicActionType.getContract)<ProjectId | undefined>(),
  setContract: createAction(ProjectBasicActionType.setContract)<ProjectContractVO | undefined>(),

  getFailReason:           createAction(ProjectBasicActionType.getFailReason)<ProjectId | undefined>(),
  setFailReason:           createAction(ProjectBasicActionType.setFailReason)<ProjectBasicFailReasonVO | undefined>(),
  updateFailReason:        createAction(ProjectBasicActionType.updateFailReason)<Partial<ProjectBasicFailReasonParameter>>(),
  requestUpdateFailReason: createAction(ProjectBasicActionType.requestUpdateFailReason)<ApiStatus>(),
};

