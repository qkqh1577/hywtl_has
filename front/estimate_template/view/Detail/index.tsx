import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateTemplateVO } from 'estimate_template/domain';
import Form from './Form';
import Footer from './Footer';
import { FormikEditable } from 'type/Form';


interface Props
  extends FormikLayoutProps<FormikEditable<EstimateTemplateVO>> {

}

export default function EstimateTemplateDetail(props: Props) {

  return (
    <PageLayout
      title={props.formik?.values?.id ? '용역 항목 상세 정보' : '용역 항목 등록'}
      body={<Form />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
}