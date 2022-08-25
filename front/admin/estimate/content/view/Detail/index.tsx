import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import Form from 'admin/estimate/content/view/Detail/Form';
import {
  FormikEditable,
  FormikPartial
} from 'type/Form';
import Footer, { FooterProps } from 'admin/estimate/content/view/Detail/Footer';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';
import { DetailListProps } from 'admin/estimate/content/view/Detail/DetailList';
import { VariableListProps } from 'admin/estimate/content/view/Detail/VariableList';

interface Props
  extends DetailListProps,
          FooterProps,
          VariableListProps,
          FormikLayoutProps<FormikEditable<FormikPartial<EstimateContentParameter>>> {
}

export default function EstimateContentDetail(props: Props) {
  return (
    <PageLayout
      title={props.formik?.values?.id ? '견적서 내용 상세 정보' : '견적서 내용 등록'}
      body={<Form {...props} />}
      footer={<Footer removeButton={props.removeButton} />}
      formik={props.formik}
    />
  );
};
