import React, {
  useCallback,
  useEffect,
} from 'react';
import {
  FormikProvider,
  useFormik
} from 'formik';
import ProjectCustomEstimateDetailModal from 'project_estimate/view/CustomDetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectEstimateAction } from 'project_estimate/action';
import { ProjectCustomEstimateChangeParameter } from 'project_estimate/parameter';
import { closeStatus } from 'components/DataFieldProps';
import useDialog from 'dialog/hook';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
} from 'project_estimate/domain';
import { DialogStatus } from 'dialog/domain';
import { projectContractAction } from 'project_contract/action';

export default function ProjectCustomEstimateDetailModalRoute() {
  const dispatch = useDispatch();
  const { projectId, customDetail, requestChangeCustom, requestDeleteCustom } = useSelector((root: RootState) => root.projectEstimate);
  const { error, rollback, confirm } = useDialog();
  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomDetailModal(undefined)), [dispatch]);
  const onChange = useCallback((params: ProjectCustomEstimateChangeParameter) => dispatch(projectEstimateAction.changeCustom(params)), [dispatch]);
  const onDelete = useCallback(() => dispatch(projectEstimateAction.deleteCustom()), [dispatch]);
  const onExtend = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setCustomExtensionModal(id)), [dispatch]);
  const openContractAddModal = useCallback((values: ProjectCustomEstimateVO) => dispatch(projectContractAction.setModal(values)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateChangeParameter>({
    initialValues: { edit: false } as unknown as ProjectCustomEstimateChangeParameter,
    onSubmit:      (values) => {
      onChange({
        id:         values.id,
        isSent:     !!values.isSent,
        sentDate:   values.sentDate,
        recipient:  values.recipient,
        note:       values.note,
        businessId: values.businessId,
      } as ProjectCustomEstimateChangeParameter);
    }
  });

  useEffect(() => {
    if (customDetail) {
      formik.setValues({
        ...customDetail,
        businessId: customDetail.business ? customDetail.business.id : undefined,
        edit:       false,
      } as unknown as ProjectCustomEstimateChangeParameter);
    }
    else {
      formik.setValues({ edit: false } as unknown as ProjectCustomEstimateChangeParameter);
    }
  }, [customDetail]);

  useEffect(() => {
    closeStatus(requestChangeCustom, () => {
      dispatch(projectEstimateAction.setProjectId(projectId!));
      dispatch(projectEstimateAction.setCustomDetailModal(customDetail!.id));
    }, () => {
      dispatch(projectEstimateAction.requestChangeCustom('idle'));
      formik.setSubmitting(false);
    });
  }, [requestChangeCustom]);

  useEffect(() => {
    closeStatus(requestDeleteCustom, () => {
      dispatch(projectEstimateAction.setProjectId(projectId!));
      dispatch(projectEstimateAction.setCustomDetailModal(undefined));
    }, () => {
      dispatch(projectEstimateAction.requestDeleteCustom('idle'));
    });
  }, [requestDeleteCustom]);

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateDetailModal
        onClose={onClose}
        onCancel={() => {
          rollback(() => {
            if (customDetail) {
              formik.setValues({
                ...customDetail,
                businessId: customDetail.business ? customDetail.business.id : undefined,
                edit:       false,
              } as unknown as ProjectCustomEstimateChangeParameter);
            }
            else {
              formik.setValues({ edit: false } as unknown as ProjectCustomEstimateChangeParameter);
            }
          });
        }}
        onDelete={() => {
          if (!customDetail) {
            error('견적서가 선택되지 않았습니다.');
            return;
          }
          confirm({
            status:       DialogStatus.WARN,
            children:     '해당 견적서를 삭제하시겠습니까?',
            confirmText:  '삭제',
            afterConfirm: () => {
              onDelete();
            },
          });
        }}
        onExtend={() => {
          if (!customDetail) {
            error('견적서가 선택되지 않았습니다.');
            return;
          }
          onExtend(customDetail.id);
        }}
        onContract={(values) => {
          if (!values.plan) {
            error('대비/협력/커스텀 견적서로 계약서를 등록하려면 먼저 실험 정보를 입력해주세요.');
            return;
          }
          openContractAddModal(values);
          onClose();
        }}
      />
    </FormikProvider>
  );
}
