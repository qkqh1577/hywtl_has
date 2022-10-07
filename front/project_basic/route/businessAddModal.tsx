import React, { useCallback } from 'react';
import ProjectBasicBusinessAddModal from 'project_basic/view/BusinessAddModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  projectBasicAction,
  projectBasicEvent
} from 'project_basic/action';

export default function ProjectBasicBusinessAddModalRoute() {

  const dispatch = useDispatch();
  const { businessAddModal } = useSelector((root: RootState) => root.projectBasic);
  const onClose = useCallback(() => dispatch(projectBasicAction.setBusinessAddModal({ ...businessAddModal, open: false })), [dispatch]);

  return (
    <ProjectBasicBusinessAddModal
      selectedValues={{
        involvedType:      businessAddModal.selected?.involvedType,
        businessId:        businessAddModal.selected?.businessId,
        businessManagerId: businessAddModal.selected?.businessManagerId
      }}
      values={businessAddModal.values || { businessList: [], businessManagerList: [] }}
      handlers={{
        onSelectInvolvedType:    type => dispatch(projectBasicEvent.business.addModal.selectInvolvedType(type)),
        onSelectBusiness:        id => dispatch(projectBasicEvent.business.addModal.selectBusiness(id)),
        onSelectBusinessManager: id => dispatch(projectBasicEvent.business.addModal.selectBusinessManager(id)),
        onBusinessFilter:        condition => dispatch(projectBasicEvent.business.addModal.requestFilterBusinessList(condition)),
        onBusinessManagerFilter: condition => dispatch(projectBasicEvent.business.addModal.requestFilterBusinessManagerList(condition)),
        onSubmit:                selected => dispatch(projectBasicEvent.business.addModal.confirmClick(selected)),
        onClose:                 onClose,
      }}
      open={businessAddModal.open}
      isSubmitting={businessAddModal.isSubmitting}
    />
  );
}
