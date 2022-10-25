import { DefaultFunction } from 'type/Function';
import ModalLayout from 'layouts/ModalLayout';
import Footer from './Footer';
import Form from './Form';
import React from 'react';
import { Box } from '@mui/material';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function ProjectCollectionStageDetailModal(props: Props) {

  return (
    <ModalLayout
      open={props.open}
      title="기성 단계 상세"
      width="60vw"
      onClose={props.onClose}
      children={
        <Box sx={{
          width: '100%',
        }}>
          <Form />
        </Box>
      }
      footer={
        <Footer
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          onClose={props.onClose}
        />}
    />
  );
}