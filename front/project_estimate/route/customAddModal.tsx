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
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectCustomEstimateAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, customAddModal, requestAddCustom } = useSelector((root: RootState) => root.projectEstimate);
  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomAddModal(undefined)), [dispatch]);
  const addCustom = useCallback((params: ProjectCustomEstimateAddParameter) => dispatch(projectEstimateAction.addCustom(params)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateAddParameter>({
    initialValues: {} as ProjectCustomEstimateAddParameter,
    onSubmit:      (values) => {
      addCustom({
        isSent:     !!values.isSent,
        businessId: values.businessId,
        recipient:  values.recipient,
        note:       values.note,
        file:       values.file,
        type:       customAddModal!,
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
    closeStatus(requestAddCustom, () => {
      onClose();
      dispatch(projectEstimateAction.setProjectId(projectId));
    }, () => {
      dispatch(projectEstimateAction.requestAddCustom('idle'));
      formik.setSubmitting(false);
    });
  }, [requestAddCustom]);

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateAddModal onClose={onClose} />
    </FormikProvider>
  );
}
