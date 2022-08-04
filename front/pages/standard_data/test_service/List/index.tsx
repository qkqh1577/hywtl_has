import React, { useEffect } from 'react';
import PageLayout from 'components/PageLayout';
import SearchForm from './SearchForm';
import DataList from './DataList';
import SeqModal from './SeqModal';
import { useTestServiceTemplate } from 'services/standard_data/test_service_template';

const TestServiceTemplateList = () => {

  const { filter, getList } = useTestServiceTemplate();

  useEffect(() => {
    getList(filter);
  }, [filter]);

  return (
    <PageLayout
      title="용역 항목 관리"
      filter={<SearchForm />}
      body={<DataList />}
      modals={<SeqModal />}
    />
  );
};

export default TestServiceTemplateList;
