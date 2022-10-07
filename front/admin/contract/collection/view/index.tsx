import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from 'admin/contract/collection/view/Form';
import Footer from 'admin/contract/collection/view/Footer';
import { DefaultFunction } from 'type/Function';

interface Props {
  onCancel: DefaultFunction;
}

export default function ContractCollectionTemplate(props: Props) {

  return (
    <PageLayout
      body={<Form />}
      footer={<Footer onCancel={props.onCancel} />}
    />
  );
};
