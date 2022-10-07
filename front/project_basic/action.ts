import { createAction } from 'typesafe-actions';
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
import { ProjectBasicBidType } from 'project_status/domain';
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';
import {
  BusinessAddModal,
  BusinessDetailModal,
  BusinessUpdateModal
} from 'project_basic/reducer';
import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId
} from 'business/domain';

export enum ProjectBasicActionType {
  setId                      = 'project/basic/id/set',
  setBasic                   = 'project/basic/basic/set',
  setBidType                 = 'project/basic/basic/bid-type/set',
  setBusinessList            = 'project/basic/business-list/set',
  setBusinessAddModal        = 'project/basic/business-add-modal/set',
  setBusinessDetailModal     = 'project/basic/business-detail-modal/set',
  setBusinessUpdateModal     = 'project/basic/business-update-modal/set',
  setDesign                  = 'project/basic/design/push',
  setTest                    = 'project/basic/test/set',
  setEstimate                = 'project/basic/estimate/set',
  setBid                     = 'project/basic/bid/set',
  setContract                = 'project/basic/contract/set',
  setFailReason              = 'project/basic/fail-reason/set',
  setLossEstimateExpectation = 'project/basic/loss-estimate-expectation/set',
}

export const projectBasicAction = {
  setId:                      createAction(ProjectBasicActionType.setId)<ProjectId | undefined>(),
  setBasic:                   createAction(ProjectBasicActionType.setBasic)<ProjectBasic | undefined>(),
  setBidType:                 createAction(ProjectBasicActionType.setBidType)<ProjectBasicBidType | undefined>(),
  setBusinessList:            createAction(ProjectBasicActionType.setBusinessList)<ProjectBasicBusiness[] | undefined>(),
  setBusinessAddModal:        createAction(ProjectBasicActionType.setBusinessAddModal)<BusinessAddModal>(),
  setBusinessDetailModal:     createAction(ProjectBasicActionType.setBusinessDetailModal)<BusinessDetailModal>(),
  setBusinessUpdateModal:     createAction(ProjectBasicActionType.setBusinessUpdateModal)<BusinessUpdateModal>(),
  setDesign:                  createAction(ProjectBasicActionType.setDesign)<ProjectBasicDesign | undefined>(),
  setTest:                    createAction(ProjectBasicActionType.setTest)<ProjectBasicTest | undefined>(),
  setEstimate:                createAction(ProjectBasicActionType.setEstimate)<ProjectBasicEstimate | undefined>(),
  setBid:                     createAction(ProjectBasicActionType.setBid)<ProjectBasicBid | undefined>(),
  setContract:                createAction(ProjectBasicActionType.setContract)<ProjectBasicContract | undefined>(),
  setFailReason:              createAction(ProjectBasicActionType.setFailReason)<ProjectBasicFailReason | undefined>(),
  setLossEstimateExpectation: createAction(ProjectBasicActionType.setLossEstimateExpectation)<boolean>(),
};

export const ProjectBasicEventType = {
  business: {
    list:        {
      addClick:   'project/basic/business/add-button/click',
      tupleClick: 'project/basic/business/tuple/click',
    },
    addModal:    {
      requestFilterBusinessList:        'project/basic/business/business-add-modal/business-list/filter/request',
      requestFilterBusinessManagerList: 'project/basic/business/business-add-modal/business-manager-list/filter/request',
      selectInvolvedType:               'project/basic/business/business-add-modal/involved-type/select',
      selectBusiness:                   'project/basic/business/business-add-modal/business-list/select',
      selectBusinessManager:            'project/basic/business/business-add-modal/business-manager-list/select',
      confirmClick:                     'project/basic/business/business-add-modal/confirm-button/click',
    },
    detailModal: {
      deleteClick: 'project/basic/business/business-detail-modal/delete-button/click',
      updateClick: 'project/basic/business/business-detail-modal/update-button/click',
    },
    updateModal: {
      requestFilterBusinessList:        'project/basic/business/business-update-modal/business-list/filter/request',
      requestFilterBusinessManagerList: 'project/basic/business/business-update-modal/business-manager-list/filter/request',
      selectInvolvedType:               'project/basic/business/business-update-modal/involved-type/select',
      selectBusiness:                   'project/basic/business/business-update-modal/business-list/select',
      selectBusinessManager:            'project/basic/business/business-update-modal/business-manager-list/select',
      confirmClick:                     'project/basic/business/business-update-modal/confirm-button/click',
    }
  },
};

export const projectBasicEvent = {
  business: {
    list:        {
      addClick:   createAction(ProjectBasicEventType.business.list.addClick)<undefined>(),
      tupleClick: createAction(ProjectBasicEventType.business.list.tupleClick)<ProjectBasicBusinessId>(),
    },
    addModal:    {
      requestFilterBusinessList:        createAction(ProjectBasicEventType.business.addModal.requestFilterBusinessList)<{ keywordType: string, keyword: string }>(),
      requestFilterBusinessManagerList: createAction(ProjectBasicEventType.business.addModal.requestFilterBusinessManagerList)<{ keywordType: string, keyword: string }>(),
      selectInvolvedType:               createAction(ProjectBasicEventType.business.addModal.selectInvolvedType)<BusinessInvolvedType>(),
      selectBusiness:                   createAction(ProjectBasicEventType.business.addModal.selectBusiness)<BusinessId>(),
      selectBusinessManager:            createAction(ProjectBasicEventType.business.addModal.selectBusinessManager)<BusinessManagerId>(),
      confirmClick:                     createAction(ProjectBasicEventType.business.addModal.confirmClick)<ProjectBasicBusinessParameter>(),
    },
    detailModal: {
      deleteClick: createAction(ProjectBasicEventType.business.detailModal.deleteClick)<undefined>(),
      updateClick: createAction(ProjectBasicEventType.business.detailModal.updateClick)<undefined>(),
    },
    updateModal: {
      requestFilterBusinessList:        createAction(ProjectBasicEventType.business.updateModal.requestFilterBusinessList)<{ keywordType: string, keyword: string }>(),
      requestFilterBusinessManagerList: createAction(ProjectBasicEventType.business.updateModal.requestFilterBusinessManagerList)<{ keywordType: string, keyword: string }>(),
      selectInvolvedType:               createAction(ProjectBasicEventType.business.updateModal.selectInvolvedType)<BusinessInvolvedType>(),
      selectBusiness:                   createAction(ProjectBasicEventType.business.updateModal.selectBusiness)<BusinessId>(),
      selectBusinessManager:            createAction(ProjectBasicEventType.business.updateModal.selectBusinessManager)<BusinessManagerId>(),
      confirmClick:                     createAction(ProjectBasicEventType.business.updateModal.confirmClick)<ProjectBasicBusinessParameter>(),
    },
  },
};
