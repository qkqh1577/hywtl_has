import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectCustomEstimateAddModal from 'project_estimate/view/CustomAddModal';
import { useFormik } from 'formik';
import {
  ProjectCustomEstimateAddParameter,
  initialProjectCustomEstimateAddParameter
} from 'project_estimate/parameter';
import React, {
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import { FormikPartial } from 'type/Form';
import useDialog from 'components/Dialog';
import { BusinessVO } from 'business/domain';

export default function ProjectCustomEstimateAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, customAddModal, requestAdd } = useSelector((root: RootState) => root.projectEstimate);
  const { error } = useDialog();

  const initialValues: FormikPartial<ProjectCustomEstimateAddParameter> = useMemo(() => {
    console.log(customAddModal);
    if (!customAddModal) {
      return initialProjectCustomEstimateAddParameter;
    }
    return {
      ...initialProjectCustomEstimateAddParameter,
      type: customAddModal
    };

  }, [customAddModal]);

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomAddModal(undefined)), [dispatch]);
  const addCustom = useCallback((params: ProjectCustomEstimateAddParameter) => dispatch(projectEstimateAction.addCustom(params)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateAddParameter>({
    enableReinitialize: true,
    initialValues:      initialValues as ProjectCustomEstimateAddParameter,
    onSubmit:           (values) => {
      if (!projectId || !customAddModal) {
        error('프로젝트가 선택되지 않았습니다.');
        return;
      }
      const business: BusinessVO | '' | undefined = (values as any).business;
      if (!business || !business.id) {
        error('업체가 선택되지 않았습니다.');
        return;
      }

      addCustom({
        isSent:     values.isSent,
        businessId: business.id,
        recipient:  values.recipient,
        note:       values.note,
        file:       values.file,
        type:       customAddModal,
      });
    }
  });

  useEffect(() => {
    if (requestAdd === 'response') {
      onClose();
      dispatch(projectEstimateAction.requestAdd('idle'));
    }
  }, [requestAdd]);

  return (
    <ProjectCustomEstimateAddModal
      formik={formik}
      onClose={onClose}
    />
  );
}