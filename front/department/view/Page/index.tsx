import React from 'react';
import PageLayout, { FormikLayoutProps } from 'components/PageLayout';
import { DepartmentQuery } from 'department/parameter/query';
import TreeViewButton from 'department/view/Page/TreeViewButton';
import SearchForm from './SearchForm';
import List, { ListProps } from './List';
import Footer, { FooterProps } from './Footer';

interface Props
  extends ListProps,
          FooterProps,
          FormikLayoutProps<DepartmentQuery> {

}

export default function DepartmentPage(props: Props) {

  return (
    <PageLayout
      title="조직 목록"
      titleRightComponent={<TreeViewButton />}
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer {...props} />}
      formik={props.formik}
    />
  );
}