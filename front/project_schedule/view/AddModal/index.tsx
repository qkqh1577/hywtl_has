import React from 'react';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import ButtonBlock from 'project_schedule/view/AddModal/ButtonBlock';
import Form from 'project_schedule/view/AddModal/Form';
import { DefaultFunction } from 'type/Function';

interface Props {
  open: boolean;
  onClose: ModalLayoutProps['onClose'];
  onSubmit: DefaultFunction;
}

export default function ProjectScheduleAddModal(props: Props) {
  const {
          open,
          onClose,
          onSubmit
        } = props;
  return (
    <ModalLayout
      title="일정 등록"
      width="30vw"
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <Form />
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
