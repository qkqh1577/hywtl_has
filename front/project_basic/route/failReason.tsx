import React from 'react';
import ProjectBasicFailReasonSection from 'project_basic/view/FailReasonSection';
import {
  FormikProvider,
  FormikValues,
  useFormik
} from 'formik';

export default function ProjectBasicFailReasonRoute() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {} as FormikValues,
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectBasicFailReasonSection />
    </FormikProvider>
  );
}
