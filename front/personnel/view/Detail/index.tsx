import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { PersonnelVO } from 'personnel/domain';
import FormList, { FormListProps } from 'personnel/view/Detail/Form';
import Footer from 'personnel/view/Detail/Footer';

interface Props
  extends
    FormListProps,
    FormikLayoutProps<PersonnelVO> {}

export default function PersonnelDetail(props: Props) {
  return (
    <PageLayout
      title="인사카드 상세"
      body={<FormList {...props} />}
      footer={<Footer />}
    />
  );
}
