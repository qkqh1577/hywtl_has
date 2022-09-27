import React from 'react';
import ProjectBasicFailReasonSection from 'project_basic/view/FailReasonSection';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicFailReasonRoute() {
  const { lossEstimateExpectation, failReason } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      win:              failReason?.win || {},
      testAmount:       failReason?.testAmount?.toString() || '',
      reviewAmount:     failReason?.reviewAmount?.toString() || '',
      totalAmount:      failReason?.totalAmount?.toString() || '',
      expectedDuration: failReason?.expectedDuration || '',
      reason:           failReason?.reason || '',
    },
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  return (
    <>
      {
        lossEstimateExpectation &&
        <FormikProvider value={formik}>
          <ProjectBasicFailReasonSection />
        </FormikProvider>
      }
    </>
  );
}
