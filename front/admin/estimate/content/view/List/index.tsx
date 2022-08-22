import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import List, { ListProps } from 'admin/estimate/content/view/List/List';
import Footer from 'admin/estimate/content/view/List/Footer';
import SearchForm from 'admin/estimate/content/view/List/SearchForm';

interface Props
  extends ListProps,
          FormikLayoutProps<EstimateContentQuery> {}

export default function EstimateContentList(props: Props) {
  return (
    <PageLayout
      title="견적서 내용 관리"
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer />}
      formik={props.formik}
    />
  );
}
