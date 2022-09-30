import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import FormList, { FormProps } from 'personnel/view/Detail/Form';
import Footer from 'personnel/view/Detail/Footer';
import { PersonnelVOInputValue } from 'personnel/route/detail';

interface Props
  extends FormProps,
          FormikLayoutProps<PersonnelVOInputValue> {
  edit: boolean;
}

export default function PersonnelDetail(props: Props) {
  const { edit, formik } = props;
  return (
    <PageLayout
      title={edit ? '인사카드 수정' : '인사카드 상세'}
      body={<FormList {...props} />}
      footer={<Footer />}
      formik={formik}
    />
  );
}