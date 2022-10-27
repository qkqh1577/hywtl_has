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
import useDialog from 'dialog/hook';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectContractFinalParameter,
  ProjectContractFinalParameter
} from 'project_contract/parameter';
import ProjectContractFinalModal from 'project_contract/view/FinalModal';

export default function ProjectContractFinalModalRoute() {

  const dispatch = useDispatch();
  const { alert, error } = useDialog();
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
    if (requestSetFinal === 'done') {
      alert('변경하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectContractAction.setProjectId(projectId));
      dispatch(projectContractAction.requestSetFinal('idle'));
      onClose();
    }
    else if (requestSetFinal === message) {
      error('변경에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectContractAction.requestSetFinal('idle'));
    }
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