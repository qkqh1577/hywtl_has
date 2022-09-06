import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from 'admin/contract/basic/view/Template/Form';
import Footer from 'admin/contract/basic/view/Template/Footer';

export default function ContractBasicTemplate() {
  return (
    <PageLayout
      body={<Form />}
      footer={<Footer />}
    />
  );
};