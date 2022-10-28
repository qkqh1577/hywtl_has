import ProjectEstimateFinalModal from 'project_estimate/view/FinalModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import { ProjectEstimateId } from 'project_estimate/domain';
import { closeStatus } from 'components/DataFieldProps';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectEstimateFinalParameter,
  ProjectEstimateFinalParameter
} from 'project_estimate/parameter';

export default function ProjectEstimateFinalModalRoute() {

  const dispatch = useDispatch();
  const { projectId, list, finalModal, requestSetFinal } = useSelector((root: RootState) => root.projectEstimate);
  const setFinal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setFinal(id)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectEstimateAction.setFinalModal(false)), [dispatch]);

  const formik = useFormik<ProjectEstimateFinalParameter>({
    initialValues: initialProjectEstimateFinalParameter,
    onSubmit:      (values) => {
      setFinal(values.id);
    }
  });

  useEffect(() => {
    if (list) {
      formik.setValues({
        id: list.find(item => item.confirmed)?.id,
      } as ProjectEstimateFinalParameter);
    }
    else {
      formik.setValues(initialProjectEstimateFinalParameter);
    }
  }, [list]);

  useEffect(() => {
    closeStatus(requestSetFinal, () => {
      onClose();
      dispatch(projectEstimateAction.setProjectId(projectId));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestSetFinal('idle'));

    });
  }, [requestSetFinal]);

  return (
    <FormikProvider value={formik}>
      <ProjectEstimateFinalModal
        open={finalModal}
        onClose={onClose}
        list={list}
      />
    </FormikProvider>
  );
}