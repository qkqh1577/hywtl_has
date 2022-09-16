import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import DetailFooter from 'project_estimate/view/CustomDetailModal/DetailFooter';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  edit: boolean;
}

export default function ProjectCustomEstimateDetailModal(props: Props) {

  const { edit, onClose, open } = props;

  return (
    <ModalLayout
      open={open}
      title={edit ? '커스텀 견적서 수정' : '커스텀 견적서 상세'}
      onClose={onClose}
    >
      {!edit && (<DetailFooter />)}
    </ModalLayout>
  );
}