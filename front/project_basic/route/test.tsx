import ProjectBasicTestSection from 'project_basic/view/TestSection';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';

export default function ProjectBasicTestRoute() {
  const { test } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      siteCount:  test?.siteCount?.toString() || '',
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
