import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import React, { useCallback, } from 'react';
import useDialog from 'components/Dialog';
import ProjectStatusFailReasonAddModal from 'project_status/view/FailReasonAddModal';
import {
  projectStatusAction,
  projectStatusEvent
} from 'project_status/action';
import { FormikPartial } from 'type/Form';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';
import { BusinessId } from 'business/domain';

export default function ProjectStatusFailReasonAddModalRoute() {

  const dispatch = useDispatch();
  const { failReasonAddModal } = useSelector((root: RootState) => root.projectStatus);

  const onClose = useCallback(() => dispatch(projectStatusEvent.cancelClickFailReasonAdd()), [dispatch]);
  const formik = useFormik<FormikPartial<ProjectBasicFailReasonParameter>>({
    enableReinitialize: true,
    initialValues:      {
      winId: '',
      testAmount: '',
      reviewAmount: '',
      totalAmount: '',
      expectedDuration: '',
      reason: '',
    },
    onSubmit:           (values: FormikPartial<ProjectBasicFailReasonParameter>) => {
      dispatch(projectStatusEvent.confirmClickFailReasonAdd({
        winId: BusinessId(1), //TODO: 사업장 선택 필요
        testAmount: +values.testAmount,
        reviewAmount: +values.reviewAmount,
        totalAmount: +values.totalAmount,
        expectedDuration: values.expectedDuration,
        reason: values.reason,
      }));
    }
  });

  return (
    <ProjectStatusFailReasonAddModal
      formik={formik}
      onClose={onClose}
      open={failReasonAddModal}
    />
  );
}
