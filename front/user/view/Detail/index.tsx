import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Footer from 'user/view/Detail/Footer';
import Form from 'user/view/Detail/Form';
import { DefaultFunction } from 'type/Function';

interface Props {
  onCancel: DefaultFunction;
  onPasswordChange: DefaultFunction;
}

export default function (props: Props) {

  return (
    <PageLayout
      title="유저 상세"
      body={<Form />}
      footer={<Footer {...props} />}
    />
  );
}