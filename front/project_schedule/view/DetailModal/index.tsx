import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import Form from 'project_schedule/view/DetailModal/Form';
import ButtonBlock from 'project_schedule/view/DetailModal/ButtonBlock';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function ProjectScheduleDetailModal(props: Props) {
  const {
          open,
          onClose,
          onDelete,
          onCancel,
        } = props;
  const formik = useContext(FormikContext);

  const edit = formik.values.edit ?? false;

  return (
    <ModalLayout
      title={edit ? '일정 수정' : '일정 상세'}
      width="30vw"
      open={open}
      onClose={onClose}
      children={<Form />}
      footer={
        <ButtonBlock
          onDelete={onDelete}
          onClose={onClose}
          onCancel={onCancel}
        />
      }
    />
  );
};
