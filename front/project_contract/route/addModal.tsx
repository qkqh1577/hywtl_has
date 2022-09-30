import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectContractAddModal from 'project_contract/view/AddModal';
import { useFormik } from 'formik';
import { ProjectContractParameter, } from 'project_contract/parameter';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { projectContractAction } from 'project_contract/action';
import useDialog from 'components/Dialog';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { projectEstimateAction } from 'project_estimate/action';
import { ProjectId } from 'project/domain';
import CollectionTotalRatioCellRoute from 'project_contract/route/CollectionTotalRatioCellRoute';

export default function ProjectContractAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, addModal } = useSelector((root: RootState) => root.projectContract);
  const { error } = useDialog();

  const initialValues = {
    estimateId:    undefined,
    isSent:        'N',
    recipient:     '',
    note:          '',
    basic:         undefined,
    collection:    undefined,
    conditionList: [{
      id:              '',
      title:           '',
      descriptionList: []
    }],
  };

  useEffect(() => {
    if (projectId) {
      dispatch(projectEstimateAction.setProjectId(ProjectId(projectId)));
    }
  }, [projectId]);

  const onClose = useCallback(() => dispatch(projectContractAction.setAddModal(undefined)), [dispatch]);
  const addContract = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.addContract(params)), [dispatch]);
  const formik = useFormik<ProjectContractParameter>({
    enableReinitialize: true,
    initialValues:      initialValues as unknown as ProjectContractParameter,
    onSubmit:           (values) => {
      if (!projectId || !addModal) {
        error('프로젝트가 선택되지 않았습니다.');
        return;
      }
      const estimate: ProjectEstimateVO | '' | undefined = (values as any).estimateId;
      if (!estimate || !estimate.id) {
        error('업체가 선택되지 않았습니다.');
        return;
      }
      addContract({
        estimateId:    estimate.id,
        isSent:        values.isSent,
        recipient:     values.recipient,
        note:          values.note,
        basic:         values.basic,
        collection:    values.collection,
        conditionList: values.conditionList,
      });
    }
  });

  return (
    <ProjectContractAddModal
      formik={formik}
      onClose={onClose}
      totalRatioCell={<CollectionTotalRatioCellRoute />}
    />
  );
}
