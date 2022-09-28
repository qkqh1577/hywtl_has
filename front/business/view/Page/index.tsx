import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { BusinessQuery } from 'business/query';
import List, { ListProps } from 'business/view/Page/List';
import SearchForm from 'business/view/Page/SearchForm';

interface Props
  extends ListProps,
          FormikLayoutProps<BusinessQuery> {
}

export default function BusinessPage(props: Props) {
  return (
    <PageLayout
      title="업체 관리"
      filter={<SearchForm />}
      body={<List {...props} />}
      formik={props.formik}
    />
  );
};
