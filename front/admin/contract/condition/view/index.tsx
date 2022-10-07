import React from 'react';
import PageLayout from 'layouts/PageLayout';
import Form from 'admin/contract/condition/view/Form';
import Footer from 'admin/contract/condition/view/Footer';
import { DefaultFunction } from 'type/Function';
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';

interface Props {
  onCancel: DefaultFunction;
  variableList: ContractConditionVariableVO[] | undefined;
}

export default function ContractConditionTemplate(props: Props) {
  return (
    <PageLayout
      body={<Form variableList={props.variableList} />}
      footer={<Footer onCancel={props.onCancel} />}
    />
  );
}
