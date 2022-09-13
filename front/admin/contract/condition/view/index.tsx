import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import Form from 'admin/contract/condition/view/Form';
import Footer from 'admin/contract/condition/view/Footer';
import { ContractConditionVO } from 'admin/contract/condition/domain';
import { VariableListProps } from './VariableList';

interface Props
  extends FormikLayoutProps<ContractConditionVO>,
          VariableListProps {
}

export default function ContractConditionTemplate(props: Props) {
  const onSubmit = () => {
    props.formik.handleSubmit();
  };
  return (
    <PageLayout
      body={<Form {...props} />}
      footer={<Footer onSubmit={onSubmit} />}
      formik={props.formik}
    />
  );
}
