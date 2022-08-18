import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { BusinessVO } from 'business/domain';
import Form from 'business/view/Detail/Form/Form';
import Footer from 'business/view/Detail/Footer';

interface Props
  extends FormikLayoutProps<BusinessVO> {
  
}

export default function BusinessDetail(props: Props) {
  return(
    <PageLayout
      body={<Form />}
      footer={<Footer {...props} />}
      formik={props.formik}
    />
  )
};
