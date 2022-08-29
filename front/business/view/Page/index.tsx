import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { BusinessQuery } from 'business/query';
import List, { ListProps } from 'business/view/Page/List';
import Footer, { FooterProps } from 'business/view/Page/Footer';
import SearchForm from 'business/view/Page/SearchForm';

interface Props
  extends ListProps,
          FooterProps,
          FormikLayoutProps<BusinessQuery> {
}

export default function BusinessPage(props: Props) {
  return (
    <PageLayout
      title="업체 관리"
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer {...props} />}
      formik={props.formik}
    />
  );
};
