import React from 'react';
import ProjectBasicDesignSection from 'project_basic/view/DesignSection';
import {
  FormikProvider,
  FormikValues,
  useFormik
} from 'formik';

export default function ProjectBasicDesignRoute() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {} as FormikValues,
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectBasicDesignSection />
    </FormikProvider>
  );
}
