import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from 'department/view/Detail/Form';
import Footer from 'department/view/Detail/Footer';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';

interface Props {
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
}

export default function DepartmentDetail(props: Props) {
  const formik = useContext(FormikContext);

  return (
    <PageLayout
      title={formik.values.id ? '조직 상세/수정' : '조직 등록'}
      body={<Form />}
      footer={<Footer onCancel={props.onCancel} onDelete={props.onDelete} />}
    />
  );
}