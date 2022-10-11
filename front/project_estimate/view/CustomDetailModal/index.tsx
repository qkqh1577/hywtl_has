import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';
import Form from './Form';
import Footer from './Footer';

interface Props {
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  onExtend: DefaultFunction;
  onContract: DefaultFunction;
}

export default function ProjectCustomEstimateDetailModal(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <ModalLayout
      width="30vw"
      open={!!formik.values.id}
      title={edit ? '커스텀 견적서 수정' : '커스텀 견적서 상세'}
      onClose={props.onClose}
      children={<Form />}
      footer={
        <Footer
          onClose={props.onClose}
          onCancel={props.onCancel}
          onDelete={props.onDelete}
          onExtend={props.onExtend}
          onContract={props.onContract}
        />
      }
    />
  );
}