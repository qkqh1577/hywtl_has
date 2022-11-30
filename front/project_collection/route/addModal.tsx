import ProjectCollectionStageAddModal from 'project_collection/view/AddModal';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectCollectionAddStageParameter } from 'project_collection/parameter';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { projectCollectionAction } from 'project_collection/action';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectCollectionStageAddModalRoute() {

  const dispatch = useDispatch();
  const { contract } = useSelector((root: RootState) => root.projectBasic);
  const { projectId, addModal, requestAddStage } = useSelector((root: RootState) => root.projectCollection);
  const onAdd = useCallback((params: ProjectCollectionAddStageParameter) => dispatch(projectCollectionAction.addStage(params)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectCollectionAction.stageAddModal(false)), [dispatch]);
  const totalAmount = useMemo(() => {
    if (!contract || !contract.id || !contract.estimate.plan?.totalAmount) {
      return undefined;
    }
    const isLh = contract.estimate.isLh;

    const value = contract.estimate.plan.totalAmount ?? 0;

    return value * (isLh ? 1.0 : 1.1);
  }, [contract]);
  const formik = useFormik<ProjectCollectionAddStageParameter>({
    initialValues: {} as ProjectCollectionAddStageParameter,
    onSubmit:      (values) => {
      onAdd(values);
    }
  });

  useEffect(() => {
    if (!addModal) {
      formik.setValues({} as ProjectCollectionAddStageParameter);
    }
  }, [addModal]);

  useEffect(() => {
    closeStatus(requestAddStage, () => {
      dispatch(projectCollectionAction.setProjectId(projectId));
      onClose();
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectCollectionAction.requestAddStage('idle'));
    });
  }, [requestAddStage]);

  return (
    <FormikProvider value={formik}>
      <ProjectCollectionStageAddModal
        totalAmount={totalAmount}
        open={addModal}
        onClose={onClose}
      />
    </FormikProvider>
  );
}
