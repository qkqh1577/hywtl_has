import React, { ReactNode } from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import Form, { FormProps } from 'admin/contract/collection/view/Form';
import Footer from 'admin/contract/collection/view/Footer';
import { ContractCollectionVO } from 'admin/contract/collection/domain';

interface Props
  extends FormProps,
          FormikLayoutProps<ContractCollectionVO> {

}

export default function ContractCollectionTemplate(props: Props) {
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
