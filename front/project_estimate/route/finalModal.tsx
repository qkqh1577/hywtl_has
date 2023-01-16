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
  const setFinal = useCallback((idList: ProjectEstimateId[]) => dispatch(projectEstimateAction.setFinal(idList)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectEstimateAction.setFinalModal(false)), [dispatch]);

  const formik = useFormik<ProjectEstimateFinalParameter>({
    initialValues: initialProjectEstimateFinalParameter,
    onSubmit:      (values) => {
      setFinal(values.idList);
    }
  });

  useEffect(() => {
    if (list) {
      formik.setValues({
        idList: list.filter(item => item.confirmed).length > 0 ? [...list.filter(item => item.confirmed).map(item => item.id)] : [],
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
