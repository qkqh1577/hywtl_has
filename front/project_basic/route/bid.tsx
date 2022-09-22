import React from 'react';
import ProjectBasicBidSection from 'project_basic/view/BidSection';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectBasicBidType } from 'project/domain';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicBidRoute() {
  const { bidType, bid } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      bid: {
        bidDate: bid?.bid?.bidDate?.toISOString().slice(0, 10) || '',
        testAmount: bid?.bid?.testAmount?.toString() || '',
        reviewAmount: bid?.bid?.reviewAmount?.toString() || '',
        totalAmount: bid?.bid?.totalAmount?.toString() || '',
        expectedDuration: bid?.bid?.expectedDuration || '',
      },
      rivalBidList: bid?.rivalBidList?.map(e => ({
        id: e.id,
        business: e.business?.name || '',
        testAmount: e.testAmount?.toString() || '',
        reviewAmount: e.reviewAmount?.toString() || '',
        totalAmount: e.totalAmount?.toString() || '',
        expectedDuration: e.expectedDuration || ''
      }))
    },
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  return (
    <>
      {
        (bidType === ProjectBasicBidType.G2B ||
          bidType === ProjectBasicBidType.COMPANY) &&
        <FormikProvider value={formik}>
          <ProjectBasicBidSection rivalBidList={bid?.rivalBidList || []} />
        </FormikProvider>
      }
    </>
  );
}
