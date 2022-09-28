import React from 'react';
import ProjectBasicEstimateSection from 'project_basic/view/EstimateSection';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectBasicBidType } from 'project_status/domain';

export default function ProjectBasicEstimateRoute() {
  const { bidType, estimate } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      estimate: {
        estimateDate: estimate?.estimate?.plan?.estimateDate?.toISOString().slice(0, 10) || '',
        estimateCode: estimate?.estimate?.code || '',
        testAmount: estimate?.estimate?.plan?.testAmount?.toString() || '',
        reviewAmount: estimate?.estimate?.plan?.reviewAmount?.toString() || '',
        totalAmount: estimate?.estimate?.plan?.totalAmount?.toString() || '',
        expectedDuration: estimate?.estimate?.plan?.expectedDuration || ''
      },
      rivalEstimateList: estimate?.rivalEstimateList?.map(e => ({
        id: e.id,
        business: e.business?.name || '',
        testAmount: e.testAmount?.toString() || '',
        reviewAmount: e.reviewAmount?.toString() || '',
        totalAmount: e.totalAmount?.toString() || '',
        expectedDuration: e.expectedDuration || '',
      }))
    },
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  return (
    <>
      {
        bidType === ProjectBasicBidType.DEFAULT &&
        <FormikProvider value={formik}>
          <ProjectBasicEstimateSection rivalEstimateList={estimate?.rivalEstimateList || []} />
        </FormikProvider>
      }
    </>
  );
}
