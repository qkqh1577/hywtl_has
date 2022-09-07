import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import Form from 'admin/contract/basic/view/Form';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import Footer from 'admin/contract/basic/view/Footer';

interface Props
  extends FormikLayoutProps<ContractBasicVO> {}

export default function ContractBasicTemplate(props: Props) {
  const onSubmit = () => {
    props.formik.handleSubmit();
  };
  return (
    <PageLayout
      body={<Form {...props} />}
      footer={<Footer onSubmit={onSubmit} />}
      formik={props.formik}
    />
  );
};
