import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import FormList, { FormListProps } from 'personnel/view/Detail/Form';
import Footer from 'personnel/view/Detail/Footer';
import { FormikEditable } from 'type/Form';
import { PersonnelVO } from 'personnel/domain';

interface Props
  extends
    FormListProps,
    FormikLayoutProps<FormikEditable<PersonnelVO>> {}

export default function PersonnelDetail(props: Props) {
  return (
    <PageLayout
      title="인사카드 상세"
      body={<FormList {...props} />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
}
