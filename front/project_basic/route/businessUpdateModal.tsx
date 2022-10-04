import React, { useCallback } from 'react';
import ProjectBasicBusinessUpdateModal from 'project_basic/view/BusinessUpdateModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  projectBasicAction,
  projectBasicEvent
} from 'project_basic/action';

export default function ProjectBasicBusinessUpdateModalRoute() {

  const dispatch = useDispatch();
  const { businessUpdateModal } = useSelector((root: RootState) => root.projectBasic);
  const onClose = useCallback(() => dispatch(projectBasicAction.setBusinessUpdateModal({ ...businessUpdateModal, open: false })), [dispatch]);

  return (
    <ProjectBasicBusinessUpdateModal
      selectedValues={{
        involvedType:      businessUpdateModal.selected?.involvedType,
        businessId:        businessUpdateModal.selected?.businessId,
        businessManagerId: businessUpdateModal.selected?.businessManagerId,
      }}
      values={businessUpdateModal.values || { businessList: [], businessManagerList: [] }}
      handlers={{
        onSelectInvolvedType:    type => dispatch(projectBasicEvent.business.updateModal.selectInvolvedType(type)),
        onSelectBusiness:        id => dispatch(projectBasicEvent.business.updateModal.selectBusiness(id)),
        onSelectBusinessManager: id => dispatch(projectBasicEvent.business.updateModal.selectBusinessManager(id)),
        onBusinessFilter:        condition => dispatch(projectBasicEvent.business.updateModal.requestFilterBusinessList(condition)),
        onBusinessManagerFilter: condition => dispatch(projectBasicEvent.business.updateModal.requestFilterBusinessManagerList(condition)),
        onSubmit:                selected => dispatch(projectBasicEvent.business.updateModal.confirmClick(selected)),
        onClose:                 onClose,
      }}
      open={businessUpdateModal.open}
      isSubmitting={businessUpdateModal.isSubmitting}
    />
  );
}
