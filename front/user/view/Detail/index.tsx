import React from 'react';
import PageLayout, { FormikLayoutProps } from 'components/PageLayout';
import { UserVO } from 'user/domain';
import Footer, { FooterProps } from 'user/view/Detail/Footer';
import Form from 'user/view/Detail/Form';

interface Props
  extends FooterProps,
          FormikLayoutProps<UserVO> {
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