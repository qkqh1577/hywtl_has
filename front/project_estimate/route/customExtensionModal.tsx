import ProjectCustomEstimateExtensionModal from 'project_estimate/view/CustomExtensionModal';
import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectEstimateAction } from 'project_estimate/action';

export default function ProjectCustomEstimateExtensionModalRoute() {

  const dispatch = useDispatch();
  const { customExtensionModal, requestExtensionCustom } = useSelector((root: RootState) => root.projectEstimate);

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomExtensionModal(undefined)), [dispatch]);

  return (
    <ProjectCustomEstimateExtensionModal
      open={typeof customExtensionModal !== 'undefined'}
      onClose={onClose}
    />
  );
}