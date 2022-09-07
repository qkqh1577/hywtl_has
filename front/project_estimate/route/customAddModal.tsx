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

export default function ProjectCustomEstimateAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, customAddModal, requestAdd } = useSelector((root: RootState) => root.projectEstimate);

  const initialValues: FormikPartial<ProjectCustomEstimateAddParameter> = useMemo(() => {
    if (!customAddModal) {
      return initialProjectCustomEstimateAddParameter;
    }
    return {
      ...initialProjectCustomEstimateAddParameter,
      type: customAddModal
    };

  }, [customAddModal]);

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomAddModal(undefined)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateAddParameter>({
    enableReinitialize: true,
    initialValues:      initialValues as ProjectCustomEstimateAddParameter,
    onSubmit:           (values) => {
      if (!projectId) {

      }
      console.log(values);
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