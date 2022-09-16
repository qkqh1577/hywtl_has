import React, { useCallback, } from 'react';
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
import { ProjectCustomEstimateVO } from 'project_estimate/domain';

export default function ProjectCustomEstimateDetailModalRoute() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.projectEstimate);

  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomDetailModal(undefined)), [dispatch]);
  const formik = useFormik<ProjectCustomEstimateVO & { edit: boolean; }>({
    enableReinitialize: true,
    initialValues:      {
      ...detail!,
      edit: false,
    },
    onSubmit:           (values) => {

    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateDetailModal
        edit={formik.values.edit}
        open={!!detail}
        onClose={onClose}
      />
    </FormikProvider>
  );
}