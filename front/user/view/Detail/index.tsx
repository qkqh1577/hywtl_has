import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import Footer from 'user/view/Detail/Footer';
import Form from 'user/view/Detail/Form';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';

interface Props {
  onCancel: DefaultFunction;
  onPasswordChange: DefaultFunction;
}

export default function (props: Props) {
  const formik = useContext(FormikContext);
  return (
    <PageLayout
      title={formik.values.id ? '유저 상세/수정' : '유저 등록'}
      body={<Form />}
      footer={<Footer {...props} />}
    />
  );
}
