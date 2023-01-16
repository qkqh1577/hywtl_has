import {
  BusinessId,
  BusinessManagerVO,
  BusinessVO
} from "../../business/domain";
import {createAction} from "typesafe-actions";
import {BusinessQuery} from "../../business/query";
import {ModalProps} from "./route/BusinessSelectorModalRoute";

export enum BusinessSelectorActionType {
  setModal       = 'system/business-selector/modal/set',
  setLoading     = 'system/business-selector/loading/set',
  setList        = 'system/business-selector/list/set',
  setFilter      = 'system/business-selector/filter/set',
  setId          = 'system/business-selector/id/set',
  setDetail      = 'system/business-selector/detail/set',
  setManagerList = 'system/business-selector/manager-list/set',
}
export const businessSelectorAction = {
  setModal:       createAction(BusinessSelectorActionType.setModal)<ModalProps | undefined>(),
  setLoading:     createAction(BusinessSelectorActionType.setLoading)<boolean>(),
  setFilter:      createAction(BusinessSelectorActionType.setFilter)<BusinessQuery>(),
  setId:          createAction(BusinessSelectorActionType.setId)<BusinessId | undefined>(),
  setList:        createAction(BusinessSelectorActionType.setList)<BusinessVO[]>(),
  setDetail:      createAction(BusinessSelectorActionType.setDetail)<BusinessVO | undefined>(),
  setManagerList: createAction(BusinessSelectorActionType.setManagerList)<BusinessManagerVO[]>(),
};