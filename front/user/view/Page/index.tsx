import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import SearchForm from 'user/view/Page/SearchForm';
import List, { ListProps } from 'user/view/Page/List';
import { UserQuery } from 'user/query';

interface Props
  extends ListProps,
          FormikLayoutProps<UserQuery> {
}

export default function (props: Props) {

  return (
    <PageLayout
      title="유저 목록"
      filter={<SearchForm />}
      body={<List {...props} />}
      formik={props.formik}
    />
  );
};
