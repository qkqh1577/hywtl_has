import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from 'admin/estimate/content/view/Detail/Form';
import Footer from 'admin/estimate/content/view/Detail/Footer';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';

interface Props {
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
  variableList: EstimateContentVariableVO[] | undefined;
}

export default function EstimateContentDetail(props: Props) {
  const formik = useContext(FormikContext);
  return (
    <PageLayout
      title={formik.values.id ? '견적서 내용 상세 정보' : '견적서 내용 등록'}
      body={<Form {...props} />}
      footer={
        <Footer
          onDelete={props.onDelete}
          onCancel={props.onCancel}
        />
      }
    />
  );
};
