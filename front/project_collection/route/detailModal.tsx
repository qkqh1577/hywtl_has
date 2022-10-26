import ProjectCollectionStageDetailModal from 'project_collection/view/DetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useDialog from 'components/Dialog';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
  useMemo
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
  const { contract } = useSelector((root: RootState) => root.projectBasic);
  const { projectId, stage, requestChangeStage, requestDeleteStage } = useSelector((root: RootState) => root.projectCollection);
  const onClose = useCallback(() => dispatch(projectCollectionAction.stageDetailModal(undefined)), [dispatch]);
  const onChangeSubmit = useCallback((params: ProjectCollectionChangeStageParameter) => dispatch(projectCollectionAction.changeStage(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectCollectionStageId) => dispatch(projectCollectionAction.deleteStage(id)), [dispatch]);
  const totalAmount = useMemo(() => {
    if (!contract || !contract.estimate.plan?.totalAmount) {
      return undefined;
    }
    const isLh = contract.estimate.isLh;

    const value = contract.estimate.plan.totalAmount ?? 0;

    return value * (isLh ? 1.0 : 1.1);
  }, [contract]);
  const formik = useFormik<ProjectCollectionChangeStageParameter>({
    initialValues: initialProjectCollectionChangeStageParameter,
    onSubmit:      (values) => {
      console.log(formik, formik.values, formik.isSubmitting);
      if (!stage || !values.id) {
        error('기성 단계가 선택되지 않았습니다.');
        return;
      }
      onChangeSubmit(values);
    }
  });

  useEffect(() => {
    if (stage) {
      formik.setValues({
        ...stage,
        edit: false
      } as unknown as ProjectCollectionChangeStageParameter);
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
        totalAmount={totalAmount}
        versionList={stage?.versionList}
        open={typeof stage !== 'undefined'}
        onClose={onClose}
        onDelete={() => {
          if (!stage) {
            error('기성 단계가 선택되지 않았습니다.');
            return;
          }
          onDelete(stage.id);
        }}
        onCancel={() => {
          rollback(() => {
            if (stage) {
              formik.setValues({
                ...stage,
                edit: false
              } as unknown as ProjectCollectionChangeStageParameter);
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