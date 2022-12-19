import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import { ProjectContractId } from 'project_contract/domain';
import { projectContractAction } from 'project_contract/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectContractFinalParameter,
  ProjectContractFinalParameter
} from 'project_contract/parameter';
import ProjectContractFinalModal from 'project_contract/view/FinalModal';
import { closeStatus } from 'components/DataFieldProps';
import { projectEstimateAction } from 'project_estimate/action';

export default function ProjectContractFinalModalRoute() {

  const dispatch = useDispatch();
  const { projectId, list, finalModal, requestSetFinal } = useSelector((root: RootState) => root.projectContract);
  const onClose = useCallback(() => dispatch(projectContractAction.setFinalModal(false)), [dispatch]);
  const setFinal = useCallback((id: ProjectContractId) => dispatch(projectContractAction.setFinal(id)), [dispatch]);

  const formik = useFormik<ProjectContractFinalParameter>({
    initialValues: initialProjectContractFinalParameter,
    onSubmit:      (values) => {
      setFinal(values.id);
    }
  });

  useEffect(() => {
    if (list) {
      formik.setValues({
        id: list.find(item => item.confirmed)?.id,
      } as ProjectContractFinalParameter);
    }
    else {
      formik.setValues(initialProjectContractFinalParameter);
    }
  }, [list]);

  useEffect(() => {
    closeStatus(requestSetFinal, () => {
      dispatch(projectContractAction.setProjectId(projectId));
      dispatch(projectEstimateAction.setProjectId(projectId));
      onClose();
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectContractAction.requestSetFinal('idle'));
    });
  }, [requestSetFinal]);

  return (
    <FormikProvider value={formik}>
      <ProjectContractFinalModal
        open={finalModal}
        onClose={onClose}
        list={list}
      />
    </FormikProvider>
  );
}
