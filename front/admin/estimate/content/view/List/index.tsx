import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import List, { ListProps } from 'admin/estimate/content/view/List/List';
import Footer, { FooterProps } from 'admin/estimate/content/view/List/Footer';
import SearchForm from 'admin/estimate/content/view/List/SearchForm';
import { EstimateContentSeqModalProps } from 'admin/estimate/content/view/List/SeqModal';
import SeqModal from 'admin/estimate/content/view/List/SeqModal'
interface Props
  extends ListProps,
          FooterProps,
          FormikLayoutProps<EstimateContentQuery> {
  modalProps: EstimateContentSeqModalProps;
}

export default function EstimateContentList(props: Props) {
  return (
    <PageLayout
      title="견적서 내용 관리"
      filter={<SearchForm />}
      body={<List {...props} />}
      footer={<Footer {...props}/>}
      formik={props.formik}
      modals={<SeqModal {...props.modalProps}/>}
    />
  );
}
