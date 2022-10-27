import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useDialog from 'dialog/hook';
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

export default function ProjectBasicFailReasonModalRoute() {

  const dispatch = useDispatch();
  const { error, alert } = useDialog();
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
    if (requestAddFailReason === 'done') {
      alert('수주 실패 정보를 등록하였습니다.');
      onClose();
      dispatch(projectBasicAction.getFailReason(id));
      dispatch(projectAction.requestAddFailReason('idle'));
    }
    else if (requestAddFailReason === message) {
      error('등록에 실패하였습니다.');
      dispatch(projectAction.requestAddFailReason('idle'));
    }

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