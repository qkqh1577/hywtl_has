import ProjectBasicTestSection from 'project_basic/view/TestSection';
import useId from 'services/useId';
import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { projectComplexAction } from 'project_complex/action';
import { ProjectId } from 'project/domain';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectComplexTestVO } from 'project_complex/domain';

export default function () {

  const id = useId();
  const dispatch = useDispatch();
  const { testDetail } = useSelector((root: RootState) => root.projectComplex);
  const formik = useFormik<Partial<ProjectComplexTestVO>>({
    enableReinitialize: true,
    initialValues:      testDetail ?? {},
    onSubmit:           () => {
      console.log('off');
    }
  });
  useEffect(() => {
    if (id) {
      dispatch(projectComplexAction.setId(ProjectId(id)));
    }
  }, [id]);

  return (
    <FormikProvider value={formik}>
      <ProjectBasicTestSection
        {...testDetail}
      />
    </FormikProvider>
  );
}