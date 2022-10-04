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
}

export default function ProjectScheduleDetailModal(props: Props) {
  const {
          open,
          onClose,
          onDelete,
        } = props;
  const formik = useContext(FormikContext);

  const edit = formik.values.edit ?? false;
  const onEdit = () => {
    formik.setFieldValue('edit', true);
  };

  const onSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <ModalLayout
      title={edit ? '일정 수정' : '일정 상세'}
      width="30vw"
      open={open}
      onClose={onClose}
      children={
        <Form edit={edit} />
      }
      footer={
        <ButtonBlock
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onClose}
          onSubmit={onSubmit}
          edit={edit}
        />
      }
    />
  );
};
