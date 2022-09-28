import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import SearchForm from 'admin/estimate/template/view/List/SearchForm';
import List, { ListProps } from 'admin/estimate/template/view/List/List';
import SeqModal, { EstimateTemplateSeqModalProps } from 'admin/estimate/template/view/List/SeqModal';

interface Props
  extends ListProps,
          FormikLayoutProps<EstimateTemplateQuery> {
  modalProps: EstimateTemplateSeqModalProps;
}

export default function EstimateTemplateList(props: Props) {

  return (
    <PageLayout
      title="용역 항목 관리 목록"
      filter={<SearchForm />}
      body={<List {...props} />}
      formik={props.formik}
      modals={<SeqModal {...props.modalProps} />}
    />
  );
}