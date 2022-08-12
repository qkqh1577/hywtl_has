import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { DepartmentVO } from 'department/domain';
import Form from 'department/view/Detail/Form';
import Footer from 'department/view/Detail/Footer';

interface Props
  extends FormikLayoutProps<DepartmentVO> {

}

export default function DepartmentDetail(props: Props) {

  return (
    <PageLayout
      title={props.formik?.values?.id ? '조직 상세/수정' : '조직 등록'}
      body={<Form />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
}