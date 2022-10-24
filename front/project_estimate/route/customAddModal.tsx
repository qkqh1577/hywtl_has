import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectCustomEstimateAddModal from 'project_estimate/view/CustomAddModal';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectCustomEstimateAddParameter, } from 'project_estimate/parameter';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import useDialog from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

export default function ProjectCustomEstimateAddModalRoute() {

  const dispatch = useDispatch();
  const { alert, error } = useDialog();
  const { projectId, customAddModal, requestAddCustom } = useSelector((root: RootState) => root.projectEstimate);

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomAddModal(undefined)), [dispatch]);
  const addCustom = useCallback((params: ProjectCustomEstimateAddParameter) => dispatch(projectEstimateAction.addCustom(params)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateAddParameter>({
    initialValues: {} as ProjectCustomEstimateAddParameter,
    onSubmit:      (values) => {
      if (!projectId || !customAddModal) {
        error('프로젝트가 선택되지 않았습니다.');
        return;
      }
      addCustom({
        isSent:     !!values.isSent,
        businessId: values.businessId,
        recipient:  values.recipient,
        note:       values.note,
        file:       values.file,
        isLh:       !!values.isLh,
        type:       customAddModal,
      });
    }
  });

  useEffect(() => {
    if (customAddModal) {
      formik.setValues({
        type: customAddModal,
      } as ProjectCustomEstimateAddParameter);
    }
    else {
      formik.setValues({} as ProjectCustomEstimateAddParameter);
    }
  }, [customAddModal]);

  useEffect(() => {
    if (requestAddCustom === ApiStatus.DONE) {
      alert('등록하였습니다.');
      onClose();
      dispatch(projectEstimateAction.setProjectId(projectId));
      dispatch(projectEstimateAction.requestAddCustom(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
    else if (requestAddCustom === ApiStatus.FAIL) {
      error('등록에 실패하였습니다.');
      dispatch(projectEstimateAction.requestAddCustom(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
  }, [requestAddCustom]);

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateAddModal onClose={onClose} />
    </FormikProvider>
  );
}