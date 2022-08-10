import React from 'react';
import PageLayout, { FormikLayoutProps } from 'components/PageLayout';
import SearchForm from 'user/view/Page/SearchForm';
import List, { ListProps } from 'user/view/Page/List';
import Footer, { FooterProps } from 'user/view/Page/Footer';
import { UserQuery } from 'user/parameter/query';

interface Props
  extends ListProps,
          FooterProps,
          FormikLayoutProps<UserQuery> {
}

export default function (props: Props) {

  return (
    <PageLayout
      title="유저 목록"
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer {...props} />}
      formik={props.formik}
    />
  );
};
