import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectScheduleParameter } from 'project_schedule/parameter';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import ButtonBlock from 'project_schedule/view/AddModal/ButtonBlock';
import Form from 'project_schedule/view/AddModal/Form';

interface Props
  extends FormikLayoutProps<ProjectScheduleParameter> {
  open: boolean;
  onClose: ModalLayoutProps['onClose'];
}

export default function ProjectScheduleAddModal(props: Props) {
  const {
          open,
          onClose,
          formik,
        } = props;
  const onSubmit = () => {formik.handleSubmit();};
  return (
    <ModalLayout
      title="일정 등록"
      width="40vw"
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <FormikProvider value={formik}>
            <Form />
          </FormikProvider>
        </Box>
      }
      footer={
        <ButtonBlock
          onSubmit={onSubmit}
          onClose={onClose}
        />
      }
    />
  );
};
