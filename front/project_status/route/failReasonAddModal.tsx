import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, { useCallback, } from 'react';
import ProjectStatusFailReasonAddModal from 'project_status/view/FailReasonAddModal';
import { projectAction } from 'project/action';

export default function ProjectStatusFailReasonAddModalRoute() {

  const dispatch = useDispatch();
  const { failReasonModal } = useSelector((root: RootState) => root.project);
  const onClose = useCallback(() => dispatch(projectAction.setFailReasonModal(false)), [dispatch]);

  return (
    <ProjectStatusFailReasonAddModal
      open={failReasonModal}
      onClose={onClose}
    />
  );
}
