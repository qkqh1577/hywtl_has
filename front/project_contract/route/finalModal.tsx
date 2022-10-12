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
import useDialog from 'components/Dialog';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectContractFinalParameter,
  ProjectContractFinalParameter
} from 'project_contract/parameter';
import ProjectContractFinalModal from 'project_contract/view/FinalModal';
import { ApiStatus } from 'components/DataFieldProps';

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
    if (requestSetFinal === ApiStatus.DONE) {
      alert('변경하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectContractAction.setProjectId(projectId));
      dispatch(projectContractAction.requestSetFinal(ApiStatus.IDLE));
      onClose();
    }
    else if (requestSetFinal === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectContractAction.requestSetFinal(ApiStatus.IDLE));
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