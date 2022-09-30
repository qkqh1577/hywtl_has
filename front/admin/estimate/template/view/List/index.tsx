import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import SearchForm from 'admin/estimate/template/view/List/SearchForm';
import List from 'admin/estimate/template/view/List/List';
import { EstimateTemplateShort } from 'admin/estimate/template/domain';
import { DefaultFunction } from 'type/Function';

interface Props
  extends FormikLayoutProps<EstimateTemplateQuery> {
  seqModal: JSX.Element;
  list: EstimateTemplateShort[] | undefined;
  openSeqModal: DefaultFunction;
}

export default function EstimateTemplateList(props: Props) {

  return (
    <PageLayout
      title="용역 항목 관리 목록"
      filter={<SearchForm />}
      body={<List {...props} />}
      formik={props.formik}
      modals={props.seqModal}
    />
  );
}