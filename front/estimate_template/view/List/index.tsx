import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateTemplateQuery } from 'estimate_template/query';
import SearchForm from './SearchForm';
import List, { ListProps } from './List';
import Footer, { FooterProps } from './Footer';
import SeqModal, { EstimateTemplateSeqModalProps } from './SeqModal';

interface Props
  extends ListProps,
          FooterProps,
          FormikLayoutProps<EstimateTemplateQuery> {
  modalProps: EstimateTemplateSeqModalProps;
}

export default function EstimateTemplateList(props: Props) {

  return (
    <PageLayout
      title="용역 항목 관리 목록"
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer {...props} />}
      formik={props.formik}
      modals={<SeqModal {...props.modalProps} />}
    />
  );
}