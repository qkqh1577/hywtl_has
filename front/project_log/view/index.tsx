import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import LogTable, { ListProps } from 'project_log/view/LogTable';
import SearchForm from 'project_log/view/SearchForm';
import { ProjectLogQuery } from 'project_log/query';
import Footer, { FooterProps } from 'project_log/view/Footer';

interface Props
  extends FormikLayoutProps<ProjectLogQuery>,
          ListProps,
          FooterProps {}

export default function ProjectLog(props: Props) {
  return (
    <PageLayout
      filter={<SearchForm />}
      body={<LogTable {...props} />}
      footer={<Footer {...props} />}
      formik={props.formik}
    />
  );
};
