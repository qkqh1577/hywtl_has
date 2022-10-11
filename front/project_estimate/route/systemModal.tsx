import ProjectSystemEstimateModal from 'project_estimate/view/SystemModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import useDialog from 'components/Dialog';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';
import React, {
  useCallback,
  useEffect
} from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import { ApiStatus } from 'components/DataFieldProps';

export default function ProjectSystemEstimateModalRoute() {
  const dispatch = useDispatch();
  const { projectId, systemModal, systemDetail, requestAddSystem, requestChangeSystem, requestDeleteSystem } = useSelector((root: RootState) => root.projectEstimate);
  const { alert, error, rollback } = useDialog();
  const onAdd = useCallback((params: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.addSystem(params)), [dispatch]);
  const onChange = useCallback((params: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.changeSystem(params)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectEstimateAction.setSystemModal(undefined)), [dispatch]);
  const onDelete = useCallback(() => dispatch(projectEstimateAction.deleteSystem()), [dispatch]);
  const formik = useFormik<ProjectSystemEstimateParameter>({
    initialValues: {} as unknown as ProjectSystemEstimateParameter,
    onSubmit:      (values) => {
      if (systemModal) {
        onChange(values);
        return;
      }
      if (systemModal === null) {
        onAdd(values);
        return;
      }
      error('시스템 견적서가 선택되지 않았습니다.');
    }
  });

  useEffect(() => {
    if (systemModal === null) {
      formik.setValues({
        edit: true
      } as unknown as ProjectSystemEstimateParameter);
    }
    else if (systemModal && systemDetail) {
      formik.setValues({
        ...systemDetail,
        edit: false,
      } as unknown as ProjectSystemEstimateParameter);
    }

  }, [systemModal, systemDetail]);

  useEffect(() => {
    if (requestAddSystem === ApiStatus.DONE) {
      alert('등록하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestAddSystem(ApiStatus.IDLE));
      dispatch(projectEstimateAction.setProjectId(projectId ?? undefined));
      dispatch(projectEstimateAction.setSystemModal(undefined));
    }
    else if (requestAddSystem === ApiStatus.FAIL) {
      error('등록에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestAddSystem(ApiStatus.IDLE));
    }
  }, [requestAddSystem]);

  useEffect(() => {
    if (requestChangeSystem === ApiStatus.DONE) {
      alert('변경하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestChangeSystem(ApiStatus.IDLE));
      dispatch(projectEstimateAction.setProjectId(projectId ?? undefined));
      dispatch(projectEstimateAction.setSystemModal(systemDetail!.id));
    }
    else if (requestChangeSystem === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestChangeSystem(ApiStatus.IDLE));
    }
  }, [requestChangeSystem]);

  useEffect(() => {
    if (requestDeleteSystem === ApiStatus.DONE) {
      alert('삭제하였습니다.');
      dispatch(projectEstimateAction.requestDeleteSystem(ApiStatus.IDLE));
      dispatch(projectEstimateAction.setProjectId(projectId ?? undefined));
      dispatch(projectEstimateAction.setSystemModal(undefined));
    }
    else if (requestDeleteSystem === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(projectEstimateAction.requestDeleteSystem(ApiStatus.IDLE));
    }
  }, [requestDeleteSystem]);

  return (
    <FormikProvider value={formik}>
      <ProjectSystemEstimateModal
        open={typeof systemModal !== 'undefined'}
        onClose={onClose}
        onCancel={() => {
          rollback(() => {
            if (systemModal === null) {
              formik.setValues({
                edit: true
              } as unknown as ProjectSystemEstimateParameter);
              dispatch(projectEstimateAction.setSystemModal(undefined));
            }
            else {
              formik.setValues({
                ...systemDetail,
                edit: false,
              } as unknown as ProjectSystemEstimateParameter);
            }
          });
        }}
        onDelete={onDelete}
      />
    </FormikProvider>
  );
}