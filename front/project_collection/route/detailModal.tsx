import ProjectCollectionStageDetailModal from 'project_collection/view/DetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useDialog from 'components/Dialog';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import { projectCollectionAction } from 'project_collection/action';
import { ProjectCollectionStageId } from 'project_collection/domain';
import {
  initialProjectCollectionChangeStageParameter,
  ProjectCollectionChangeStageParameter
} from 'project_collection/parameter';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ApiStatus } from 'components/DataFieldProps';

export default function ProjectCollectionStageDetailModalRoute() {

  const dispatch = useDispatch();
  const { error, alert, rollback } = useDialog();
  const { projectId, detailModal, stage, requestChangeStage, requestDeleteStage } = useSelector((root: RootState) => root.projectCollection);
  const onClose = useCallback(() => dispatch(projectCollectionAction.stageDetailModal(undefined)), [dispatch]);
  const onChange = useCallback((params: ProjectCollectionChangeStageParameter) => dispatch(projectCollectionAction.changeStage(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectCollectionStageId) => dispatch(projectCollectionAction.deleteStage(id)), [dispatch]);
  const formik = useFormik<ProjectCollectionChangeStageParameter>({
    initialValues: initialProjectCollectionChangeStageParameter,
    onSubmit:      (values) => {
      onChange(values);
    }
  });

  useEffect(() => {
    if (stage) {
      formik.setValues({ ...stage, edit: false } as ProjectCollectionChangeStageParameter);
    }
    else {
      formik.setValues(initialProjectCollectionChangeStageParameter);
    }
  }, [stage]);

  useEffect(() => {
    if (requestChangeStage === ApiStatus.DONE) {
      formik.setSubmitting(false);
      alert('변경하였습니다.');
      onClose();
      dispatch(projectCollectionAction.setProjectId(projectId));
      dispatch(projectCollectionAction.requestChangeStage(ApiStatus.IDLE));
    }
    else if (requestChangeStage === ApiStatus.FAIL) {
      formik.setSubmitting(false);
      error('변경에 실패하였습니다.');
      dispatch(projectCollectionAction.requestChangeStage(ApiStatus.IDLE));

    }
  }, [requestChangeStage]);

  useEffect(() => {
    if (requestDeleteStage === ApiStatus.DONE) {
      alert('삭제하였습니다.');
      onClose();
      dispatch(projectCollectionAction.setProjectId(projectId));
      dispatch(projectCollectionAction.requestDeleteStage(ApiStatus.IDLE));
    }
    else if (requestDeleteStage === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(projectCollectionAction.requestDeleteStage(ApiStatus.IDLE));

    }
  }, [requestDeleteStage]);

  return (
    <FormikProvider value={formik}>
      <ProjectCollectionStageDetailModal
        open={typeof detailModal !== 'undefined'}
        onClose={onClose}
        onDelete={() => {
          if (!detailModal) {
            error('기성 단계가 선택되지 않았습니다.');
            return;
          }
          onDelete(detailModal);
        }}
        onCancel={() => {
          rollback(() => {
            if (stage) {
              formik.setValues({ ...stage, edit: false } as ProjectCollectionChangeStageParameter);
            }
            else {
              formik.setValues(initialProjectCollectionChangeStageParameter);
            }
          });
        }}
      />
    </FormikProvider>
  );
}