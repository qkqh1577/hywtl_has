import React, { useCallback } from 'react';
import ProjectBasicBusinessDetailModal from 'project_basic/view/BusinessDetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  projectBasicAction,
  projectBasicEvent
} from 'project_basic/action';

export default function ProjectBasicBusinessDetailModalRoute() {

  const dispatch = useDispatch();
  const { businessDetailModal } = useSelector((root: RootState) => root.projectBasic);
  const onClose = useCallback(() => dispatch(projectBasicAction.setBusinessDetailModal({ ...businessDetailModal, open: false })), [dispatch]);

  return (
    <>
      {businessDetailModal.values &&
        <ProjectBasicBusinessDetailModal
          values={businessDetailModal.values}
          handlers={{
            onDeleteOpen: () => dispatch(projectBasicEvent.business.detailModal.deleteClick()),
            onUpdateOpen: () => dispatch(projectBasicEvent.business.detailModal.updateClick()),
            onClose
          }}
          open={businessDetailModal.open}
          isSubmitting={businessDetailModal.isSubmitting}
        />}
    </>
  );
}
