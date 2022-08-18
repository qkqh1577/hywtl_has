import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { BusinessVO } from 'business/domain';
import Form from 'business/view/Detail/Form';
import Footer from 'business/view/Detail/Footer';
import { RegistrationNumberCheckButtonProps } from 'business/view/Detail/Form/RegistrationNumberCheckButton';

export interface FormValues
  extends BusinessVO {
  edit: boolean;
}

interface Props
  extends RegistrationNumberCheckButtonProps,
          FormikLayoutProps<FormValues> {

}

export default function BusinessDetail(props: Props) {
  return (
    <PageLayout
      title={props.formik.values?.id ? '업체 정보 상세' : '업체 등록'}
      body={<Form {...props} />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
};
