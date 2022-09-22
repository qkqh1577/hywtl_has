import React from 'react';
import PageLayout, { FormikLayoutProps, } from 'layouts/PageLayout';
import List, { ListProps } from 'personnel/view/Page/List';
import { PersonnelQuery } from 'personnel/query';
import SearchBox from 'personnel/view/Page/SearchForm';
import Footer, { FooterProps } from 'personnel/view/Page/Footer';

interface Props
  extends ListProps,
          FooterProps,
          FormikLayoutProps<PersonnelQuery> {

}

export default function PersonnelPage(props: Props) {

  return (
    <PageLayout
      title="인사카드 관리"
      filter={<SearchBox />}
      body={<List {...props} />}
      footer={<Footer {...props}/>}
      formik={props.formik}
    />
  );
};
