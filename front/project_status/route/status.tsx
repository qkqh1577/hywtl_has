import {
  FormikProvider,
  useFormik
} from 'formik';
import { projectStatusAction } from 'project_status/action';
import { toValues } from 'type/Form';
import React, { useEffect } from 'react';
import ProjectContainerStatusBar from 'project_status/view/Status';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectStatusStatusRoute() {
  const dispatch = useDispatch();
  const { status } = useSelector((root: RootState) => root.projectStatus);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      progressStatus: status?.progressStatus || '',
      estimateExpectation: status?.estimateExpectation || '',
      estimateStatus: status?.estimateStatus || '',
      contractStatus: status?.contractStatus || '',
    },
    onSubmit:           (values,
                         helper
                        ) => {
      dispatch(projectStatusAction.updateStatus({
        values: toValues(values),
        ...helper
      }));
    },
  });

  useEffect(() => {
    if (!status?.estimateExpectation) {
      return;
    }
    dispatch(projectStatusAction.setEstimateExpectation(status.estimateExpectation));
  }, [status]);

  return (
    <FormikProvider value={formik}>
      <ProjectContainerStatusBar handleChangeEstimateExpectation={(e) => {
        dispatch(projectStatusAction.setEstimateExpectation(e.target.value));
      }} />
    </FormikProvider>
  );
}
