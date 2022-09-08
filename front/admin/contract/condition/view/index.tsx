import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from 'admin/contract/condition/view/Form';

export default function ContractConditionTemplate(props) {
  return (
    <PageLayout
      body={<Form />}
    />
  );
}
