import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import Form  from 'admin/contract/basic/view/Template/Form';
import Footer from 'admin/contract/basic/view/Template/Footer';
import { ContractBasicVO } from 'admin/contract/basic/domain';

interface Props
  extends FormikLayoutProps<ContractBasicVO> {}

export default function ContractBasicTemplate(props: Props) {
  return (
    <PageLayout
      body={<Form {...props} />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
};
