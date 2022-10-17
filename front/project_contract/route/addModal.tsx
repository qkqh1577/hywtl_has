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
import {
  ProjectId,
  ProjectVO
} from 'project/domain';
import { projectContractApi } from 'project_contract/api';
import { projectApi } from 'project/api';
import { ContractCollectionVO, } from 'admin/contract/collection/domain';
import { contractCollectionApi } from 'admin/contract/collection/api';
import { ContractConditionListVO } from 'admin/contract/condition/domain';
import { contractConditionApi } from 'admin/contract/condition/api';
import { contractBasicApi } from 'admin/contract/basic/api';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import {
  ProjectEstimateId,
  ProjectEstimateVO
} from 'project_estimate/domain';

export default function ProjectContractAddModalRoute() {
  const dispatch = useDispatch();
  const { projectId, addModal } = useSelector((root: RootState) => root.projectContract);
  const { error } = useDialog();

  useEffect(() => {
    if (projectId) {
      dispatch(projectContractAction.setProjectId(ProjectId(projectId)));
      (async () => {
        let values = await getInitialValues(projectId);
        await formik.setValues(values);
      })();
    }
  }, [projectId]);

  const getInitialValues: any = async (pid) => {
    if (!pid) {
      return undefined;
    }
    const project: ProjectVO = await projectApi.getOne(ProjectId(pid));
    const basic: ContractBasicVO = await contractBasicApi.getOne();
    const collection: ContractCollectionVO = await contractCollectionApi.getOne();
    const conditionList: ContractConditionListVO = await contractConditionApi.getOne();
    const initialValues = {
      estimateId:    undefined,
      isSent:        'N',
      recipient:     '',
      note:          '',
      basic:         {
        ...basic,
        serviceName:           project.name,
        serviceDuration:       `${'확인필요'}(착수보고 시) ~ ${'확인필요'}(최종보고서 인도)`,
        contractorAddress:     basic.contractor.address,
        contractorCompanyName: basic.contractor.companyName,
        contractorCeoName:     basic.contractor.ceoName,
        contractDate:          new Date(),
        contractDateSplit:     {
          year:  new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day:   new Date().getDate(),
        }
      },
      collection:    { ...collection },
      conditionList: [...conditionList.contractConditionList],
    };
    return new Promise((resolve) => {
      resolve(initialValues);
    });
  };

  const onClose = useCallback(() => dispatch(projectContractAction.setAddModal(undefined)), [dispatch]);
  const addContract = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.addContract(params)), [dispatch]);
  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues: {
                     basic:         {},
                     collection:    { stageList: [] },
                     conditionList: [],
                     edit:          true,
                   } as any,
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
      {<ProjectContractAddModal
        formik={formik}
        onClose={onClose}
        handleEstimateIdChange={handleEstimateIdChange}
      />}
    </>);
}
