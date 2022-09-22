import ProjectBasicContractSection from 'project_basic/view/ContractSection';
import React from 'react';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicContractRoute() {
  const { contract } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      orderer1: contract?.orderer1 || '',
      orderer2: contract?.orderer2 || '',
      orderer3: contract?.orderer3 || '',
      orderer4: contract?.orderer4 || '',
      testAmount: contract?.testAmount?.toString() || '',
      reviewAmount: contract?.reviewAmount?.toString() || '',
      totalAmount: contract?.totalAmount?.toString() || '',
      expectedDuration: contract?.expectedDuration || ''
    },
    onSubmit:           () => {
      console.log('off');
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectBasicContractSection projectContractCollectionStageList={contract?.projectContractCollectionStageList || []} />
    </FormikProvider>
  );
}
