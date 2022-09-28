import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { DepartmentQuery } from 'department/query';
import TreeViewButton from 'department/view/Page/TreeViewButton';
import SearchForm from './SearchForm';
import List, { ListProps } from './List';

interface Props
  extends ListProps,
          FormikLayoutProps<DepartmentQuery> {

}

export default function DepartmentPage(props: Props) {

  return (
    <PageLayout
      title="조직 목록"
      titleRightComponent={<TreeViewButton />}
      filter={<SearchForm />}
      body={<List {...props} />}
      formik={props.formik}
    />
  );
}