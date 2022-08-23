import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import Form from 'admin/estimate/content/view/Detail/Form';
import { FormikEditable } from 'type/Form';
import { EstimateContentVO } from 'admin/estimate/content/domain';
import Footer from 'admin/estimate/content/view/Detail/Footer';

interface Props
  extends FormikLayoutProps<FormikEditable<EstimateContentVO>> {}

export default function EstimateContentDetail(props: Props) {
  return (
    <PageLayout
      title={props.formik?.values?.id ? '견적서 내용 상세 정보' : '견적서 내용 등록'}
      body={<Form />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
};
