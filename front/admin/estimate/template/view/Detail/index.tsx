import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from './Form';
import Footer from './Footer';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';

interface Props {
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function EstimateTemplateDetail(props: Props) {

  const formik = useContext(FormikContext);
  return (
    <PageLayout
      title={formik.values?.id ? '용역 항목 상세 정보' : '용역 항목 등록'}
      body={<Form />}
      footer={
        <Footer
          onCancel={props.onCancel}
          onDelete={props.onDelete}
        />
      }
    />
  );
}