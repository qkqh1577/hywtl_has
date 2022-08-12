import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import SearchForm from 'user/view/Page/SearchForm';
import List from 'user/view/Page/List';
import Footer, { UserPageFooterProps } from 'user/view/Page/Footer';
import { UserQuery } from 'user/query';

interface Props
  extends UserPageFooterProps,
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
