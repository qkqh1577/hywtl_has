import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectCustomEstimateAddModal from 'project_estimate/view/CustomAddModal';
import { useFormik } from 'formik';
import { ProjectCustomEstimateAddParameter, } from 'project_estimate/parameter';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import useDialog, { dialogActions } from 'components/Dialog';
import { BusinessVO } from 'business/domain';
import { ApiStatus } from 'components/DataFieldProps';

export default function ProjectCustomEstimateAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, customAddModal, requestAddCustom } = useSelector((root: RootState) => root.projectEstimate);
  const { error } = useDialog();

  const initialValues = {
    isSent:       false,
    isSentSelect: 'N',
    recipient:    '',
    business:     undefined,
    note:         '',
    file:         undefined,
    type:         customAddModal,
  };

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomAddModal(undefined)), [dispatch]);
  const addCustom = useCallback((params: ProjectCustomEstimateAddParameter) => dispatch(projectEstimateAction.addCustom(params)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateAddParameter>({
    enableReinitialize: true,
    initialValues:      initialValues as unknown as ProjectCustomEstimateAddParameter,
    onSubmit:           (values) => {
      if (!projectId || !customAddModal) {
        error('프로젝트가 선택되지 않았습니다.');
        return;
      }
      const business: BusinessVO | '' | undefined = (values as any).business;
      if (!business || !business.id) {
        error('업체가 선택되지 않았습니다.');
        return;
      }

      addCustom({
        isSent:     values.isSent ?? (values as any).isSentSelect === 'Y',
        businessId: business.id,
        recipient:  values.recipient,
        note:       values.note,
        file:       values.file,
        type:       customAddModal,
      });
    }
  });

  useEffect(() => {
    if (requestAddCustom === ApiStatus.RESPONSE) {
      onClose();
      dispatch(dialogActions.openAlert('등록하였습니다.'));
      dispatch(projectEstimateAction.setProjectId(projectId));
      dispatch(projectEstimateAction.requestAddCustom(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
  }, [requestAddCustom]);

  return (
    <ProjectCustomEstimateAddModal
      formik={formik}
      onClose={onClose}
    />
  );
}