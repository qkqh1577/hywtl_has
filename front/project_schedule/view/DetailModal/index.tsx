import React from 'react';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikProvider } from 'formik';
import Form from 'project_schedule/view/DetailModal/Form';
import ButtonBlock from 'project_schedule/view/DetailModal/ButtonBlock';
import { DetailModalFormik } from 'project_schedule/route/detailModal';

interface Props
  extends FormikLayoutProps<DetailModalFormik | object> {
  open: boolean;
  onClose: ModalLayoutProps['onClose'];
  onDelete: () => void;
}

export default function ProjectScheduleDetailModal(props: Props) {
  const {
          open,
          onClose,
          onDelete,
          formik
        } = props;

  const edit = (formik.values as any).edit ?? false;
  const onEdit = () => {
    formik.setFieldValue('edit', true);
  };

  const onSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <ModalLayout
      title={edit ? '일정 수정' : '일정 상세'}
      width="40vw"
      open={open}
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Form edit={edit} />
        </FormikProvider>
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