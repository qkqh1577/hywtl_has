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
import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  projectEstimateTypeName
} from 'project_estimate/domain';
import { FormikEditable } from 'type/Form';
import { ProjectCustomEstimateChangeParameter } from 'project_estimate/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import { dialogActions } from 'components/Dialog';

interface ProjectCustomEstimateDetailForm
  extends FormikEditable<ProjectCustomEstimateVO> {
  typeName: string;
  isSentSelect: 'Y' | 'N';
  isFinal: 'Y' | 'N';
}

export default function ProjectCustomEstimateDetailModalRoute() {
  const dispatch = useDispatch();
  const { projectId, customDetail, requestChangeCustom } = useSelector((root: RootState) => root.projectEstimate);

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomDetailModal(undefined)), [dispatch]);
  const onChange = useCallback((params: ProjectCustomEstimateChangeParameter) => dispatch(projectEstimateAction.changeCustom(params)), [dispatch]);
  const onChangeCancel = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setCustomDetailModal(id)), [dispatch]);

  const formik = useFormik<Partial<ProjectCustomEstimateDetailForm>>({
    enableReinitialize: true,
    initialValues:      {},
    onSubmit:           (values) => {
      onChange({
        ...values,
        businessId: values.business?.id,
      } as ProjectCustomEstimateChangeParameter);
    }
  });
  useEffect(() => {
    if (customDetail) {
      formik.setValues({
        ...customDetail,
        typeName:     projectEstimateTypeName(customDetail.type),
        isSentSelect: customDetail.isSent ? 'Y' : 'N',
        isFinal:      customDetail.confirmed ? 'Y' : 'N',
        edit:         false,
      });
    }
  }, [customDetail]);

  useEffect(() => {
    if (requestChangeCustom === ApiStatus.RESPONSE) {
      dispatch(dialogActions.openAlert('저장되었습니다.'));
      dispatch(projectEstimateAction.setProjectId(projectId!));
      dispatch(projectEstimateAction.setCustomDetailModal(undefined));
      dispatch(projectEstimateAction.requestChangeCustom(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
  }, [requestChangeCustom]);

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateDetailModal
        open={!!customDetail}
        onClose={onClose}
        onChangeCancel={onChangeCancel}
      />
    </FormikProvider>
  );
}