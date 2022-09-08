import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  ProjectEstimateType,
  projectEstimateTypeName
} from 'project_estimate/domain';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikProvider } from 'formik';
import { DefaultFunction } from 'type/Function';
import Form from './Form';

interface Props
  extends FormikLayoutProps<any> {
  onClose: DefaultFunction;
}

export default function ProjectCustomEstimateAddModal(props: Props) {
  const { formik, onClose } = props;
  const type: ProjectEstimateType | '' | undefined = formik.values.type;
  const open = typeof type !== 'undefined' && type !== '';

  return (
    <ModalLayout
      width="30vw"
      open={open}
      title={`${open ? projectEstimateTypeName(type!) : ''} 견적서 등록`}
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Form formik={formik} />
        </FormikProvider>
      }
      footer={
        <DetailFormFooter
          onSubmit={() => {
            formik.handleSubmit();
          }}
          onClose={onClose}
        />
      }
    />
  );
}