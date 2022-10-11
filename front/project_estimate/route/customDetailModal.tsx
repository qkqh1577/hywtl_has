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
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectCustomEstimateDetailModalRoute() {
  const dispatch = useDispatch();
  const { projectId, customDetail, requestChangeCustom } = useSelector((root: RootState) => root.projectEstimate);
  const { alert, error, rollback, confirm } = useDialog();
  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomDetailModal(undefined)), [dispatch]);
  const onChange = useCallback((params: ProjectCustomEstimateChangeParameter) => dispatch(projectEstimateAction.changeCustom(params)), [dispatch]);
  const onDelete = useCallback(() => dispatch(projectEstimateAction.deleteCustom()), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateChangeParameter>({
    initialValues: { edit: false } as unknown as ProjectCustomEstimateChangeParameter,
    onSubmit:      (values) => {
      onChange({
        id:         values.id,
        isSent:     values.isSent,
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
        businessId: customDetail.business.id,
        edit:       false,
      } as unknown as ProjectCustomEstimateChangeParameter);
    }
    else {
      formik.setValues({ edit: false } as unknown as ProjectCustomEstimateChangeParameter);
    }
  }, [customDetail]);

  useEffect(() => {
    if (requestChangeCustom === ApiStatus.DONE) {
      alert('변경하었습니다.');
      dispatch(projectEstimateAction.setProjectId(projectId!));
      dispatch(projectEstimateAction.setCustomDetailModal(undefined));
      dispatch(projectEstimateAction.requestChangeCustom(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
    else if (requestChangeCustom === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(projectEstimateAction.requestChangeCustom(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
  }, [requestChangeCustom]);

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateDetailModal
        onClose={onClose}
        onCancel={() => {
          rollback(() => {
            if (customDetail) {
              formik.setValues({
                ...customDetail,
                businessId: customDetail.business.id,
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
            status:       'warn',
            children:     '해당 견적서를 삭제하시겠습니까?',
            confirmText:  '삭제',
            afterConfirm: () => {
              onDelete();
            },
          });
        }}
        onExtend={() => {

        }}
        onContract={() => {

        }}
      />
    </FormikProvider>
  );
}