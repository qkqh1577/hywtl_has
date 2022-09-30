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
import { ProjectId } from 'project/domain';
import CollectionTotalRatioCellRoute from 'project_contract/route/CollectionTotalRatioCellRoute';
import { projectContractApi } from 'project_contract/api';
import {
  ProjectEstimateId,
  ProjectEstimateVO
} from 'project_contract/domain';

const initialValues = {
  estimateId:    undefined,
  isSent:        'N',
  recipient:     '',
  note:          '',
  basic:         undefined,
  collection:    {
    stageNote:       '',
    stageList:       [
      {
        name:         '',
        ratio:        0,
        amount:       0,
        note:         '',
        expectedDate: undefined,
      }
    ],
    totalAmountNote: '',
    totalAmount:     0,
  },
  conditionList: [{
    id:              '',
    title:           '',
    descriptionList: []
  }],
};

export default function ProjectContractAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, addModal, variableList } = useSelector((root: RootState) => root.projectContract);
  const { error } = useDialog();

  useEffect(() => {
    if (projectId) {
      dispatch(projectContractAction.setProjectId(ProjectId(projectId)));
    }
  }, [projectId]);

  const onClose = useCallback(() => dispatch(projectContractAction.setAddModal(undefined)), [dispatch]);
  const addContract = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.addContract(params)), [dispatch]);
  const formik = useFormik<ProjectContractParameter>({
    enableReinitialize: false,
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
      //용역 기간 용역 금액 기성 단계 금액 계산 필요
      addContract({
        estimateId:    estimate.id,
        isSent:        values.isSent,
        recipient:     values.recipient,
        note:          values.note,
        basic:         values.basic,
        collection:    values.collection,
        conditionList: values.conditionList,
      });
    },
  });

  const handleEstimateIdChange = (estimateId: number) => {
    formik.setFieldValue('estimateId', estimateId);
    projectContractApi.getEstimateDetail(ProjectEstimateId(estimateId))
                      .then((estimateDetail) => {
                        dispatch(projectContractAction.setEstimateDetail(estimateDetail));
                        formik.setFieldValue('basic.serviceDuration', `구조설계용 풍하중은 ${estimateDetail?.plan.expectedTestDeadline}주차, 최종결과보고서는 ${estimateDetail?.plan.expectedFinalReportDeadline}주차`);
                      });
  };

  return (
    <ProjectContractAddModal
      formik={formik}
      onClose={onClose}
      totalRatioCell={<CollectionTotalRatioCellRoute />}
      handleEstimateIdChange={handleEstimateIdChange}
      variableList={variableList}
    />
  );
}
