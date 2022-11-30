import ProjectCollectionStageDetailModal from 'project_collection/view/DetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useDialog from 'dialog/hook';
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
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectCollectionStageDetailModalRoute() {

  const dispatch = useDispatch();
  const { error, rollback } = useDialog();
  const { contract } = useSelector((root: RootState) => root.projectBasic);
  const { projectId, stage, requestChangeStage, requestDeleteStage } = useSelector((root: RootState) => root.projectCollection);
  const onClose = useCallback(() => dispatch(projectCollectionAction.stageDetailModal(undefined)), [dispatch]);
  const onChange = useCallback((params: ProjectCollectionChangeStageParameter) => dispatch(projectCollectionAction.changeStage(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectCollectionStageId) => dispatch(projectCollectionAction.deleteStage(id)), [dispatch]);
  const totalAmount = useMemo(() => {
    if (!contract || !contract.id || !contract.estimate.plan?.totalAmount) {
      return undefined;
    }
    const isLh = contract.estimate.isLh;

    const value = contract.estimate.plan.totalAmount ?? 0;

    return value * (isLh ? 1.0 : 1.1);
  }, [contract]);
  const formik = useFormik<ProjectCollectionChangeStageParameter>({
    initialValues: initialProjectCollectionChangeStageParameter,
    onSubmit:      (values) => {
      onChange(values);
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
    closeStatus(requestChangeStage, () => {
      dispatch(projectCollectionAction.setProjectId(projectId));
      onClose();
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectCollectionAction.requestChangeStage('idle'));
    });
  }, [requestChangeStage]);

  useEffect(() => {
    closeStatus(requestDeleteStage, () => {
      dispatch(projectCollectionAction.setProjectId(projectId));
      onClose();
    }, () => {
      dispatch(projectCollectionAction.requestDeleteStage('idle'));
    });
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
