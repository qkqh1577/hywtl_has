import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Footer, { FooterProps } from 'user/view/Detail/Footer';
import Form from 'user/view/Detail/Form';

interface Props
  extends FooterProps {
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