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

export default function ProjectBasicTestRoute() {
  const { test } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      siteCount: test?.siteCount?.toString() || '',
      targetTest: test?.targetTest || ''
    },
    onSubmit:           () => {
      console.log('off');
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectBasicTestSection testList={test?.testList || []} />
    </FormikProvider>
  );
}
