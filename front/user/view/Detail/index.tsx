import React from 'react';
import PageLayout from 'components/PageLayout';
import { UserVO } from 'user/domain/user';
import Footer, { FooterProps } from 'user/view/Detail/Footer';
import Form from 'user/view/Detail/Form';
import { FormikConfig } from 'formik';

interface Props
  extends FooterProps {
  formik: FormikConfig<UserVO>;
}

export default function (props: Props) {

  return (
    <PageLayout
      title="유저 상세"
      body={<Form />}
      footer={<Footer {...props} />}
      formik={props.formik}
    />
  );
}