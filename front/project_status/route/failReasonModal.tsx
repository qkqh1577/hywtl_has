import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { projectAction } from 'project/action';
import { projectBasicAction } from 'project_basic/action';
import { RootState } from 'services/reducer';
import ProjectStatusFailReasonAddModal from 'project_status/view/FailReasonAddModal';
import {
  initialProjectBasicFailReasonParameter,
  ProjectBasicFailReasonParameter
} from 'project_basic/parameter';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectBasicFailReasonModalRoute() {

  const dispatch = useDispatch();
  const { id, failReasonModal, requestAddFailReason } = useSelector((root: RootState) => root.project);
  const onClose = useCallback(() => dispatch(projectAction.setFailReasonModal(false)), [dispatch]);
  const addFailReason = useCallback((params: ProjectBasicFailReasonParameter) => dispatch(projectAction.addFailReason(params)), [dispatch]);

  const formik = useFormik<ProjectBasicFailReasonParameter>({
    initialValues: initialProjectBasicFailReasonParameter,
    onSubmit:      (values) => {
      addFailReason(values);
    }
  });

  useEffect(() => {
    if (!failReasonModal) {
      dispatch(projectAction.setId(id));
      formik.setValues(initialProjectBasicFailReasonParameter);
    }
  }, [failReasonModal]);

  useEffect(() => {
    closeStatus(requestAddFailReason, () => {
      onClose();
      dispatch(projectBasicAction.getFailReason(id));
    }, () => {
      dispatch(projectAction.requestAddFailReason('idle'));
    });
  }, [requestAddFailReason]);

  return (
    <FormikProvider value={formik}>
      <ProjectStatusFailReasonAddModal
        open={failReasonModal}
        onClose={onClose}
      />
    </FormikProvider>
  );
}