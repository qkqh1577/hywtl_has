import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateTemplateQuery } from 'estimate_template/query';
import SearchForm from './SearchForm';
import List, { ListProps } from './List';
import Footer from './Footer';

interface Props
  extends ListProps,
          FormikLayoutProps<EstimateTemplateQuery> {}

export default function EstimateTemplateList(props: Props) {

  return (
    <PageLayout
      title="용역 항목 관리 목록"
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
}