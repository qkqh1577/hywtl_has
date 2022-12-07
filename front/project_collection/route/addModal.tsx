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
import useDialog from 'dialog/hook';

export default function ProjectCollectionStageAddModalRoute() {
  const dispatch = useDispatch();
  const { error } = useDialog();
  const { contract } = useSelector((root: RootState) => root.projectBasic);
  const { projectId, addModal, requestAddStage, detail } = useSelector((root: RootState) => root.projectCollection);
  const onAdd = useCallback((params: ProjectCollectionAddStageParameter) => dispatch(projectCollectionAction.addStage(params)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectCollectionAction.stageAddModal(false)), [dispatch]);
  const totalAmount = useMemo(() => {
    if (!contract || !contract.id || !contract.estimate.plan?.totalAmount) {
      return undefined;
    }
    const isLh = contract.estimate.plan.isLh;

    const value = contract.estimate.plan.totalAmount ?? 0;
    return Number((value * (isLh ? 1.0 : 1.1)).toFixed(0));
  }, [contract]);

  const stageList = detail?.stageList;
  const amountBySum = useMemo(() => stageList && stageList.map(stage => stage.amount)
                                                        .reduce((prev,
                                                                 curr
                                                        ) => prev + curr, 0), [stageList]);

  const formik = useFormik<ProjectCollectionAddStageParameter>({
    initialValues: {} as ProjectCollectionAddStageParameter,
    onSubmit:      (values) => {
      if ((totalAmount && amountBySum) && totalAmount < (amountBySum + values.amount)) {
        error('총 기성 비율이 100%를 초과합니다. 금액을 변경하여 비율을 변경하시기 바랍니다.');
        return;
      }
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
        amountBySum={amountBySum}
      />
    </FormikProvider>
  );
}
