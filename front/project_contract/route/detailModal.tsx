import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { projectContractAction } from 'project_contract/action';
import useDialog from 'components/Dialog';
import { projectContractApi } from 'project_contract/api';

import { ProjectContractId, } from 'project_contract/domain';
import ProjectContractDetailModal from 'project_contract/view/DetailModal';
import {
  ProjectEstimateId,
  ProjectEstimateVO
} from 'project_estimate/domain';

export default function ProjectContractDetailModalRoute() {
  const dispatch = useDispatch();
  const { projectId, detailModal: projectContractId } = useSelector((root: RootState) => root.projectContract);
  const { error } = useDialog();

  useEffect(() => {
    if (projectContractId) {
      projectContractApi.getOne(ProjectContractId(projectContractId))
                        .then((data) => {
                          formik.setValues({
                            ...data,
                            estimateId: ProjectEstimateId(data.estimate.id),
                            basic:      {
                              ...data.basic,
                              contractDateSplit: getDateSplit(data?.basic?.contractDate ?? new Date()),
                            }
                          } as any);
                          dispatch(projectContractAction.setEstimateDetail(data.estimate));
                        });
    }
  }, [projectContractId]);

  const getDateSplit = (contractDate: Date) => {
    const date = new Date(contractDate);
    return {
      year:  date.getFullYear(),
      month: date.getMonth() + 1,
      day:   date.getDate(),
    };
  };

  const onClose = useCallback(() => dispatch(projectContractAction.setDetailModal(undefined)), [dispatch]);
  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues:      {
                          estimateId:    undefined,
                          isSent:        'N',
                          recipient:     '',
                          note:          '',
                          basic:         {},
                          collection:    { stageList: [] },
                          conditionList: [],
                        } as any,
    onSubmit:           (values) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        return;
      }
      else if (!projectContractId) {
        error('계약서가 선택되지 않았습니다.');
        return;
      }

      const estimate: ProjectEstimateVO | '' | undefined = (values as any).estimateId;
      if (!estimate || !estimate.id) {
        error('업체가 선택되지 않았습니다.');
        return;
      }
      console.log(values);
      //용역 기간 용역 금액 기성 단계 금액 계산 필요
      /*addContract({
        estimateId:    estimate.id,
        isSent:        values.isSent,
        recipient:     values.recipient,
        note:          values.note,
        basic:         values.basic,
        collection:    values.collection,
        conditionList: values.conditionList,
      });*/
    },
  });

  const handleEstimateIdChange = (estimateId: number) => {
    formik.setFieldValue('estimateId', estimateId);
    projectContractApi.getEstimateDetail(ProjectEstimateId(estimateId))
                      .then((estimateDetail) => {
                        dispatch(projectContractAction.setEstimateDetail(estimateDetail));
                        const totalAmount = Math.floor((estimateDetail?.plan?.totalAmount ?? 0) * 1.1);
                        formik.setValues({
                          ...formik.values,
                          basic:      {
                            ...formik.values.basic,
                            serviceDurationWeekNumber: `구조설계용 풍하중은 ${estimateDetail?.plan?.expectedTestDeadline}주차, 최종결과보고서는 ${estimateDetail?.plan?.expectedFinalReportDeadline}주차`
                          },
                          collection: {
                            ...formik.values.collection,
                            totalAmount: totalAmount,
                            stageList:   formik.values.collection?.stageList.map((stage) => {
                              return {
                                ...stage,
                                amount: totalAmount * stage.ratio / 100
                              };
                            })
                          }
                        });
                      });
  };

  return (
    <>
      {<ProjectContractDetailModal
        formik={formik}
        onClose={onClose}
        handleEstimateIdChange={handleEstimateIdChange}
      />}
    </>);
}
